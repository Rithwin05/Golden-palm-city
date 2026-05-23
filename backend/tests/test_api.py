"""Backend API tests for Golden Palm City — Concierge API."""
import os
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL") or "https://golden-sanctuary.preview.emergentagent.com"
BASE_URL = BASE_URL.rstrip("/")
API = f"{BASE_URL}/api"

EXPECTED_SLUGS = {"golden-palm-city", "vantage-farms", "chandan-valley", "doctors-colony"}


@pytest.fixture(scope="module")
def session():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# Health
def test_health(session):
    r = session.get(f"{API}/")
    assert r.status_code == 200, r.text
    data = r.json()
    assert data.get("status") == "ok"
    assert "message" in data


# Projects list
def test_list_projects(session):
    r = session.get(f"{API}/projects")
    assert r.status_code == 200, r.text
    data = r.json()
    assert isinstance(data, list)
    assert len(data) == 4
    slugs = {p["slug"] for p in data}
    assert slugs == EXPECTED_SLUGS
    flagship = [p for p in data if p.get("is_flagship")]
    assert len(flagship) == 1
    assert flagship[0]["slug"] == "golden-palm-city"
    # ensure each has expected fields
    for p in data:
        assert p["name"]
        assert p["location"]
        assert p["image_url"].startswith("http")
        assert isinstance(p["highlights"], list)


# Get by slug — valid
@pytest.mark.parametrize("slug", sorted(EXPECTED_SLUGS))
def test_get_project_by_slug(session, slug):
    r = session.get(f"{API}/projects/{slug}")
    assert r.status_code == 200, r.text
    data = r.json()
    assert data["slug"] == slug


# Get by slug — invalid
def test_get_project_invalid_slug(session):
    r = session.get(f"{API}/projects/golden-sanctuary")
    assert r.status_code == 404


# Concierge inquiry create + read back
def test_create_inquiry_and_list(session):
    payload = {
        "name": "TEST_Concierge User",
        "phone": "+919999999999",
        "email": "test_concierge@example.com",
        "interest": "Golden Palm City",
        "message": "TEST inquiry from pytest",
    }
    r = session.post(f"{API}/concierge/inquiries", json=payload)
    assert r.status_code == 200, r.text
    body = r.json()
    assert body["name"] == payload["name"]
    assert body["phone"] == payload["phone"]
    assert body["interest"] == payload["interest"]
    assert "id" in body and isinstance(body["id"], str) and len(body["id"]) > 0
    assert "created_at" in body
    new_id = body["id"]

    # GET list and ensure our inquiry is present (newest-first)
    r2 = session.get(f"{API}/concierge/inquiries")
    assert r2.status_code == 200, r2.text
    inquiries = r2.json()
    assert isinstance(inquiries, list)
    ids = [i["id"] for i in inquiries]
    assert new_id in ids
    # newest first — our just-created should be near the top
    assert inquiries[0]["id"] == new_id or new_id in ids[:5]


# Concierge inquiry — minimal payload (only name + phone)
def test_create_inquiry_minimal(session):
    payload = {"name": "TEST_Minimal", "phone": "+918888888888"}
    r = session.post(f"{API}/concierge/inquiries", json=payload)
    assert r.status_code == 200, r.text
    body = r.json()
    assert body["name"] == "TEST_Minimal"
    assert body["email"] is None


# Concierge inquiry — missing required fields
def test_create_inquiry_validation_missing_phone(session):
    r = session.post(f"{API}/concierge/inquiries", json={"name": "TEST_No Phone"})
    assert r.status_code == 422


def test_create_inquiry_validation_missing_name(session):
    r = session.post(f"{API}/concierge/inquiries", json={"phone": "+910000000000"})
    assert r.status_code == 422


# ===== Iteration 2: Extended Project fields =====
def test_golden_palm_city_extended_fields(session):
    """Flagship project must expose description, gallery (>=2 imgs), amenities, plot_sizes, area, connectivity."""
    r = session.get(f"{API}/projects/golden-palm-city")
    assert r.status_code == 200, r.text
    p = r.json()
    # description
    assert isinstance(p.get("description"), str) and len(p["description"]) > 20
    # gallery >= 2 imgs
    assert isinstance(p.get("gallery"), list) and len(p["gallery"]) >= 2
    for url in p["gallery"]:
        assert isinstance(url, str) and url.startswith("http")
    # amenities
    assert isinstance(p.get("amenities"), list) and len(p["amenities"]) >= 3
    # masterplan_url present in schema (may be None) — key MUST exist
    assert "masterplan_url" in p
    # plot_sizes + area as strings
    assert isinstance(p.get("plot_sizes"), str) and len(p["plot_sizes"]) > 0
    assert isinstance(p.get("area"), str) and len(p["area"]) > 0
    # connectivity list with content
    assert isinstance(p.get("connectivity"), list) and len(p["connectivity"]) >= 2


@pytest.mark.parametrize("slug", sorted(EXPECTED_SLUGS))
def test_all_slugs_have_extended_schema_keys(session, slug):
    """All 4 projects must expose the extended schema keys (values may be empty/null)."""
    r = session.get(f"{API}/projects/{slug}")
    assert r.status_code == 200, r.text
    p = r.json()
    for key in ("description", "gallery", "amenities", "masterplan_url", "area", "plot_sizes", "connectivity"):
        assert key in p, f"missing key {key} on {slug}"
    # types
    assert isinstance(p["gallery"], list)
    assert isinstance(p["amenities"], list)
    assert isinstance(p["connectivity"], list)
