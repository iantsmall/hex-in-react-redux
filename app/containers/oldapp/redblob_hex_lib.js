// Generated code -- http://www.redblobgames.com/grids/hexagons/
/* eslint-disable */

function Point(x, y) {
  return { x, y };
}

function Hex(q, r, s) {
  return { q, r, s };
}

function hex_add(a, b) {
  return Hex(a.q + b.q, a.r + b.r, a.s + b.s);
}

function hex_subtract(a, b) {
  return Hex(a.q - b.q, a.r - b.r, a.s - b.s);
}

function hex_scale(a, k) {
  return Hex(a.q * k, a.r * k, a.s * k);
}

const hex_directions = [
  Hex(1, 0, -1),
  Hex(1, -1, 0),
  Hex(0, -1, 1),
  Hex(-1, 0, 1),
  Hex(-1, 1, 0),
  Hex(0, 1, -1),
];
function hex_direction(direction) {
  return hex_directions[direction];
}

function hex_neighbor(hex, direction) {
  return hex_add(hex, hex_direction(direction));
}

const hex_diagonals = [
  Hex(2, -1, -1),
  Hex(1, -2, 1),
  Hex(-1, -1, 2),
  Hex(-2, 1, 1),
  Hex(-1, 2, -1),
  Hex(1, 1, -2),
];
function hex_diagonal_neighbor(hex, direction) {
  return hex_add(hex, hex_diagonals[direction]);
}

function hex_length(hex) {
  return Math.trunc((Math.abs(hex.q) + Math.abs(hex.r) + Math.abs(hex.s)) / 2);
}

function hex_distance(a, b) {
  return hex_length(hex_subtract(a, b));
}

function hex_round(h) {
  let q = Math.trunc(Math.round(h.q));
  let r = Math.trunc(Math.round(h.r));
  let s = Math.trunc(Math.round(h.s));
  const q_diff = Math.abs(q - h.q);
  const r_diff = Math.abs(r - h.r);
  const s_diff = Math.abs(s - h.s);
  if (q_diff > r_diff && q_diff > s_diff) {
    q = -r - s;
  } else if (r_diff > s_diff) {
    r = -q - s;
  } else {
    s = -q - r;
  }
  return Hex(q, r, s);
}

function hex_lerp(a, b, t) {
  return Hex(
    a.q * (1 - t) + b.q * t,
    a.r * (1 - t) + b.r * t,
    a.s * (1 - t) + b.s * t,
  );
}

function hex_linedraw(a, b) {
  const N = hex_distance(a, b);
  const a_nudge = Hex(a.q + 0.000001, a.r + 0.000001, a.s - 0.000002);
  const b_nudge = Hex(b.q + 0.000001, b.r + 0.000001, b.s - 0.000002);
  const results = [];
  const step = 1.0 / Math.max(N, 1);
  for (let i = 0; i <= N; i++) {
    results.push(hex_round(hex_lerp(a_nudge, b_nudge, step * i)));
  }
  return results;
}

function OffsetCoord(col, row) {
  return { col, row };
}

const EVEN = 1;
const ODD = -1;
function qoffset_from_cube(offset, h) {
  const col = h.q;
  const row = h.r + Math.trunc((h.q + offset * (h.q & 1)) / 2);
  return OffsetCoord(col, row);
}

function qoffset_to_cube(offset, h) {
  const q = h.col;
  const r = h.row - Math.trunc((h.col + offset * (h.col & 1)) / 2);
  const s = -q - r;
  return Hex(q, r, s);
}

function roffset_from_cube(offset, h) {
  const col = h.q + Math.trunc((h.r + offset * (h.r & 1)) / 2);
  const row = h.r;
  return OffsetCoord(col, row);
}

function roffset_to_cube(offset, h) {
  const q = h.col - Math.trunc((h.row + offset * (h.row & 1)) / 2);
  const r = h.row;
  const s = -q - r;
  return Hex(q, r, s);
}

function Orientation(f0, f1, f2, f3, b0, b1, b2, b3, start_angle) {
  return { f0, f1, f2, f3, b0, b1, b2, b3, start_angle };
}

function Layout(orientation, size, origin) {
  return { orientation, size, origin };
}

const layout_pointy = Orientation(
  Math.sqrt(3.0),
  Math.sqrt(3.0) / 2.0,
  0.0,
  3.0 / 2.0,
  Math.sqrt(3.0) / 3.0,
  -1.0 / 3.0,
  0.0,
  2.0 / 3.0,
  0.5,
);
const layout_flat = Orientation(
  3.0 / 2.0,
  0.0,
  Math.sqrt(3.0) / 2.0,
  Math.sqrt(3.0),
  2.0 / 3.0,
  0.0,
  -1.0 / 3.0,
  Math.sqrt(3.0) / 3.0,
  0.0,
);
function hex_to_pixel(layout, h) {
  const M = layout.orientation;
  const { size } = layout;
  const { origin } = layout;
  const x = (M.f0 * h.q + M.f1 * h.r) * size.x;
  const y = (M.f2 * h.q + M.f3 * h.r) * size.y;
  return Point(x + origin.x, y + origin.y);
}

function pixel_to_hex(layout, p) {
  const M = layout.orientation;
  const { size } = layout;
  const { origin } = layout;
  const pt = Point((p.x - origin.x) / size.x, (p.y - origin.y) / size.y);
  const q = M.b0 * pt.x + M.b1 * pt.y;
  const r = M.b2 * pt.x + M.b3 * pt.y;
  return Hex(q, r, -q - r);
}

function hex_corner_offset(layout, corner) {
  const M = layout.orientation;
  const { size } = layout;
  const angle = (2.0 * Math.PI * (M.start_angle - corner)) / 6;
  return Point(size.x * Math.cos(angle), size.y * Math.sin(angle));
}

function polygon_corners(layout, h) {
  const corners = [];
  const center = hex_to_pixel(layout, h);
  for (let i = 0; i < 6; i++) {
    const offset = hex_corner_offset(layout, i);
    corners.push(Point(center.x + offset.x, center.y + offset.y));
  }
  return corners;
}

// Tests

function complain(name) {
  console.log('FAIL', name);
}

function equal_hex(name, a, b) {
  if (!(a.q == b.q && a.s == b.s && a.r == b.r)) {
    complain(name);
  }
}

function equal_offsetcoord(name, a, b) {
  if (!(a.col == b.col && a.row == b.row)) {
    complain(name);
  }
}

function equal_int(name, a, b) {
  if (!(a == b)) {
    complain(name);
  }
}

function equal_hex_array(name, a, b) {
  equal_int(name, a.length, b.length);
  for (let i = 0; i < a.length; i++) {
    equal_hex(name, a[i], b[i]);
  }
}

function test_hex_arithmetic() {
  equal_hex('hex_add', Hex(4, -10, 6), hex_add(Hex(1, -3, 2), Hex(3, -7, 4)));
  equal_hex(
    'hex_subtract',
    Hex(-2, 4, -2),
    hex_subtract(Hex(1, -3, 2), Hex(3, -7, 4)),
  );
}

function test_hex_direction() {
  equal_hex('hex_direction', Hex(0, -1, 1), hex_direction(2));
}

function test_hex_neighbor() {
  equal_hex('hex_neighbor', Hex(1, -3, 2), hex_neighbor(Hex(1, -2, 1), 2));
}

function test_hex_diagonal() {
  equal_hex(
    'hex_diagonal',
    Hex(-1, -1, 2),
    hex_diagonal_neighbor(Hex(1, -2, 1), 3),
  );
}

function test_hex_distance() {
  equal_int('hex_distance', 7, hex_distance(Hex(3, -7, 4), Hex(0, 0, 0)));
}

function test_hex_round() {
  const a = Hex(0, 0, 0);
  const b = Hex(1, -1, 0);
  const c = Hex(0, -1, 1);
  equal_hex(
    'hex_round 1',
    Hex(5, -10, 5),
    hex_round(hex_lerp(Hex(0, 0, 0), Hex(10, -20, 10), 0.5)),
  );
  equal_hex('hex_round 2', hex_round(a), hex_round(hex_lerp(a, b, 0.499)));
  equal_hex('hex_round 3', hex_round(b), hex_round(hex_lerp(a, b, 0.501)));
  equal_hex(
    'hex_round 4',
    hex_round(a),
    hex_round(
      Hex(
        a.q * 0.4 + b.q * 0.3 + c.q * 0.3,
        a.r * 0.4 + b.r * 0.3 + c.r * 0.3,
        a.s * 0.4 + b.s * 0.3 + c.s * 0.3,
      ),
    ),
  );
  equal_hex(
    'hex_round 5',
    hex_round(c),
    hex_round(
      Hex(
        a.q * 0.3 + b.q * 0.3 + c.q * 0.4,
        a.r * 0.3 + b.r * 0.3 + c.r * 0.4,
        a.s * 0.3 + b.s * 0.3 + c.s * 0.4,
      ),
    ),
  );
}

function test_hex_linedraw() {
  equal_hex_array(
    'hex_linedraw',
    [
      Hex(0, 0, 0),
      Hex(0, -1, 1),
      Hex(0, -2, 2),
      Hex(1, -3, 2),
      Hex(1, -4, 3),
      Hex(1, -5, 4),
    ],
    hex_linedraw(Hex(0, 0, 0), Hex(1, -5, 4)),
  );
}

function test_layout() {
  const h = Hex(3, 4, -7);
  const flat = Layout(layout_flat, Point(10, 15), Point(35, 71));
  equal_hex('layout', h, hex_round(pixel_to_hex(flat, hex_to_pixel(flat, h))));
  const pointy = Layout(layout_pointy, Point(10, 15), Point(35, 71));
  equal_hex(
    'layout',
    h,
    hex_round(pixel_to_hex(pointy, hex_to_pixel(pointy, h))),
  );
}

function test_conversion_roundtrip() {
  const a = Hex(3, 4, -7);
  const b = OffsetCoord(1, -3);
  equal_hex(
    'conversion_roundtrip even-q',
    a,
    qoffset_to_cube(EVEN, qoffset_from_cube(EVEN, a)),
  );
  equal_offsetcoord(
    'conversion_roundtrip even-q',
    b,
    qoffset_from_cube(EVEN, qoffset_to_cube(EVEN, b)),
  );
  equal_hex(
    'conversion_roundtrip odd-q',
    a,
    qoffset_to_cube(ODD, qoffset_from_cube(ODD, a)),
  );
  equal_offsetcoord(
    'conversion_roundtrip odd-q',
    b,
    qoffset_from_cube(ODD, qoffset_to_cube(ODD, b)),
  );
  equal_hex(
    'conversion_roundtrip even-r',
    a,
    roffset_to_cube(EVEN, roffset_from_cube(EVEN, a)),
  );
  equal_offsetcoord(
    'conversion_roundtrip even-r',
    b,
    roffset_from_cube(EVEN, roffset_to_cube(EVEN, b)),
  );
  equal_hex(
    'conversion_roundtrip odd-r',
    a,
    roffset_to_cube(ODD, roffset_from_cube(ODD, a)),
  );
  equal_offsetcoord(
    'conversion_roundtrip odd-r',
    b,
    roffset_from_cube(ODD, roffset_to_cube(ODD, b)),
  );
}

function test_offset_from_cube() {
  equal_offsetcoord(
    'offset_from_cube even-q',
    OffsetCoord(1, 3),
    qoffset_from_cube(EVEN, Hex(1, 2, -3)),
  );
  equal_offsetcoord(
    'offset_from_cube odd-q',
    OffsetCoord(1, 2),
    qoffset_from_cube(ODD, Hex(1, 2, -3)),
  );
}

function test_offset_to_cube() {
  equal_hex(
    'offset_to_cube even-',
    Hex(1, 2, -3),
    qoffset_to_cube(EVEN, OffsetCoord(1, 3)),
  );
  equal_hex(
    'offset_to_cube odd-q',
    Hex(1, 2, -3),
    qoffset_to_cube(ODD, OffsetCoord(1, 2)),
  );
}

function test_all() {
  test_hex_arithmetic();
  test_hex_direction();
  test_hex_neighbor();
  test_hex_diagonal();
  test_hex_distance();
  test_hex_round();
  test_hex_linedraw();
  test_layout();
  test_conversion_roundtrip();
  test_offset_from_cube();
  test_offset_to_cube();
}

test_all();

// Exports for node/browserify modules:

exports.Point = Point;

exports.Hex = Hex;
exports.hex_add = hex_add;
exports.hex_subtract = hex_subtract;
exports.hex_scale = hex_scale;
exports.hex_directions = hex_directions;
exports.hex_direction = hex_direction;
exports.hex_neighbor = hex_neighbor;
exports.hex_diagonals = hex_diagonals;
exports.hex_diagonal_neighbor = hex_diagonal_neighbor;
exports.hex_length = hex_length;
exports.hex_distance = hex_distance;
exports.hex_round = hex_round;
exports.hex_lerp = hex_lerp;
exports.hex_linedraw = hex_linedraw;

exports.OffsetCoord = OffsetCoord;
exports.EVEN = EVEN;
exports.ODD = ODD;
exports.qoffset_from_cube = qoffset_from_cube;
exports.qoffset_to_cube = qoffset_to_cube;
exports.roffset_from_cube = roffset_from_cube;
exports.roffset_to_cube = roffset_to_cube;

exports.Orientation = Orientation;

exports.Layout = Layout;
exports.layout_pointy = layout_pointy;
exports.layout_flat = layout_flat;
exports.hex_to_pixel = hex_to_pixel;
exports.pixel_to_hex = pixel_to_hex;
exports.hex_corner_offset = hex_corner_offset;
exports.polygon_corners = polygon_corners;
