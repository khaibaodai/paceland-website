/* PaceLand — assets/js/data.js (xuất từ trang quản trị 13:58:13 1/7/2026) */

const SITE = {
  "name": "PaceLand",
  "legalName": "Công Ty Cổ Phần Đầu Tư Pace Land",
  "tagline": "Kiến tạo giá trị thịnh vượng",
  "positioning": "Mạng lưới bất động sản kín",
  "domain": "paceland.vn",
  "hotline": "0903 983 737",
  "hotlineRaw": "0903983737",
  "email": "contact@paceland.vn",
  "address": "35 Đường số 36, Khu phố 2, P. Bình Trưng, TP. Thủ Đức, TP. Hồ Chí Minh",
  "zalo": "https://zalo.me/0903983737",
  "facebook": "https://www.facebook.com/paceland.vn/",
  "youtube": "https://www.youtube.com/@paceland-vn",
  "tiktok": "#",
  "formEndpoint": "https://formspree.io/f/mjgnvwqk",
  "leadEndpoint": "",
  "tracking": {
    "ga4": "",
    "adsId": "",
    "adsLabel": "",
    "metaPixel": ""
  },
  "mapEmbed": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7810.390221473243!2d106.74871418169498!3d10.793580615497275!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752738634e8dbd%3A0x64048b0ca1ccaa18!2zQ8OUTkcgVFkgQ-G7lCBQSOG6pk4gxJDhuqZVIFTGryBQQUNFIExBTkQ!5e1!3m2!1svi!2s!4v1783093230682!5m2!1svi!2s"
};

const NAV = [
  {
    "href": "index.html",
    "label": "Trang chủ"
  },
  {
    "href": "du-an.html",
    "label": "Dự án"
  },
  {
    "href": "gioi-thieu.html",
    "label": "Giới thiệu"
  },
  {
    "href": "doi-tac.html",
    "label": "Đối tác"
  },
  {
    "href": "goc-nhin.html",
    "label": "Góc nhìn"
  },
  {
    "href": "cong-cu.html",
    "label": "Công cụ"
  },
  {
    "href": "tuyen-dung.html",
    "label": "Tuyển dụng"
  },
  {
    "href": "lien-he.html",
    "label": "Liên hệ"
  }
];

function ph(id, w) { return "https://images.unsplash.com/photo-" + id + "?auto=format&fit=crop&w=" + (w || 1200) + "&q=80"; }

const FILTERS = {
  "area": [
    "Tất cả",
    "Trung tâm",
    "Khu Đông",
    "Khu Nam",
    "Vùng ven & nghỉ dưỡng"
  ],
  "segment": [
    "Mọi phân khúc",
    "Siêu sang",
    "Hạng sang",
    "Cao cấp",
    "Nghỉ dưỡng"
  ],
  "type": [
    "Mọi loại hình",
    "Căn hộ",
    "Biệt thự",
    "Nhà phố thương mại"
  ],
  "price": [
    "Mọi mức giá",
    "Dưới 10 tỉ",
    "10 – 30 tỉ",
    "30 – 60 tỉ",
    "Trên 60 tỉ"
  ]
};

const PROJECTS = [
  {
    "id": "the-prive",
    "name": "The Privé",
    "developer": "Đại Quang Minh",
    "location": "Khu đô thị Thủ Thiêm, TP. Thủ Đức",
    "area": "Khu Đông",
    "segment": "Hạng sang",
    "type": "Căn hộ",
    "status": "Đang mở bán",
    "offmarket": false,
    "badge": "Biên lợi nhuận cao",
    "priceText": "Từ 8,5 tỉ",
    "priceValue": 8.5,
    "beds": "1–3 PN",
    "size": "50 – 121 m²",
    "handover": "2027",
    "cover": "assets/img/media/the-prive-2.jpg",
    "gallery": [
      "assets/img/media/the-prive-1.jpg",
      "assets/img/media/the-prive-2.jpg",
      "assets/img/media/the-prive-3.jpg"
    ],
    "short": "Bộ sưu tập căn hộ giới hạn nhìn thẳng lõi trung tâm Thủ Thiêm — quỹ căn đẹp được giữ riêng cho khách hàng PaceLand.",
    "description": [
      "The Privé là dự án căn hộ hạng sang toạ lạc tại vị trí kim cương của Khu đô thị mới Thủ Thiêm, đối diện trực tiếp trung tâm Quận 1 qua sông Sài Gòn. Đây là một trong số ít dự án sở hữu biên độ tăng giá vượt trội nhờ quỹ đất khan hiếm và hạ tầng kết nối hoàn thiện.",
      "PaceLand giữ một số căn vị trí đẹp (view sông, view trung tâm) ở mức giá ưu tiên dành cho khách hàng trong mạng lưới — tiếp cận trước khi sản phẩm được công bố rộng rãi."
    ],
    "amenities": [
      "Hồ bơi vô cực",
      "Phòng chờ trên cao",
      "Khu nghỉ dưỡng & spa",
      "An ninh 3 lớp",
      "Hầm đỗ xe thông minh",
      "Quản gia 24/7"
    ]
  },
  {
    "id": "eaton-park",
    "name": "Eaton Park",
    "developer": "Gamuda Land",
    "location": "Mai Chí Thọ, An Phú, TP. Thủ Đức",
    "area": "Khu Đông",
    "segment": "Hạng sang",
    "type": "Căn hộ",
    "status": "Đang mở bán",
    "offmarket": false,
    "badge": "Dòng tiền ổn định",
    "priceText": "Từ 9,2 tỉ",
    "priceValue": 9.2,
    "beds": "1–4 PN",
    "size": "52 – 178 m²",
    "handover": "2027",
    "cover": "assets/img/media/eaton-park-1.jpg",
    "gallery": [
      "assets/img/media/eaton-park-1.jpg",
      "assets/img/media/eaton-park-2.jpg",
      "assets/img/media/eaton-park-3.jpg"
    ],
    "short": "Khu căn hộ resort phong cách Singapore ngay mặt tiền Mai Chí Thọ, kết nối tức thì về trung tâm và sân bay Long Thành.",
    "description": [
      "Eaton Park do Gamuda Land phát triển trên trục Mai Chí Thọ — cửa ngõ Khu Đông, kết nối nhanh về Quận 1, Thủ Thiêm và cao tốc đi Long Thành. Dự án nổi bật với mật độ xây dựng thấp và hệ tiện ích resort.",
      "Sản phẩm phù hợp cả nhu cầu ở thực lẫn dòng tiền cho thuê ổn định nhờ tệp chuyên gia nước ngoài trong khu vực."
    ],
    "amenities": [
      "Nhà câu lạc bộ 2.000 m²",
      "Hồ bơi muối khoáng",
      "Vườn thiền",
      "Khu nướng ngoài trời",
      "Phòng gym & yoga",
      "Trường mầm non nội khu"
    ]
  },
  {
    "id": "the-global-city",
    "name": "The Global City",
    "developer": "Masterise Homes",
    "location": "An Phú, TP. Thủ Đức",
    "area": "Khu Đông",
    "segment": "Siêu sang",
    "type": "Nhà phố thương mại",
    "status": "Giao dịch kín",
    "offmarket": true,
    "badge": "Biểu tượng",
    "priceText": "Từ 42 tỉ",
    "priceValue": 42,
    "beds": "Nhà phố 5×20m",
    "size": "100 – 280 m²",
    "handover": "2026",
    "cover": "assets/img/media/the-global-city-1.jpg",
    "gallery": [
      "assets/img/media/the-global-city-1.jpg",
      "assets/img/media/the-global-city-2.jpg",
      "assets/img/media/the-global-city-3.jpg"
    ],
    "short": "\"Downtown\" mới của Sài Gòn — quần thể nhà phố, nhà phố thương mại và đại lộ trung tâm do Masterise Homes kiến tạo.",
    "description": [
      "The Global City được định vị là trung tâm mới của TP.HCM với quảng trường, hồ cảnh quan và đại lộ thương mại sầm uất. Quỹ nhà phố – nhà phố thương mại có khả năng khai thác kinh doanh và tích sản dài hạn.",
      "PaceLand tư vấn các căn góc, vị trí mặt tiền đại lộ — nhóm sản phẩm biểu tượng cho danh mục tài sản đẳng cấp."
    ],
    "amenities": [
      "Quảng trường trung tâm",
      "Hồ cảnh quan 3,2 ha",
      "Phố thương mại",
      "Công viên ánh sáng",
      "An ninh tầng lớp",
      "Hạ tầng đồng bộ"
    ]
  },
  {
    "id": "gladia-heights",
    "name": "Gladia Heights",
    "developer": "Chủ đầu tư uy tín",
    "location": "Cửa ngõ Đông Bắc TP.HCM",
    "area": "Khu Đông",
    "segment": "Cao cấp",
    "type": "Căn hộ",
    "status": "Đang mở bán",
    "offmarket": false,
    "badge": "Tiềm năng tăng giá",
    "priceText": "Từ 4,4 tỉ",
    "priceValue": 4.4,
    "beds": "1–3 PN",
    "size": "48 – 110 m²",
    "handover": "2027",
    "cover": "assets/img/media/gladia-heights-1.jpg",
    "gallery": [
      "assets/img/media/gladia-heights-1.jpg",
      "assets/img/media/gladia-heights-2.jpg",
      "assets/img/media/gladia-heights-3.jpg"
    ],
    "short": "Tổ hợp căn hộ cao tầng đón đầu hạ tầng vành đai và metro mở rộng — cơ hội vào sớm với mức giá gốc.",
    "description": [
      "Gladia Heights nằm tại cửa ngõ Đông Bắc, hưởng lợi trực tiếp từ các tuyến vành đai và quy hoạch metro mở rộng. Đây là dự án trọng điểm trong nhóm tăng trưởng của PaceLand.",
      "Khách hàng trong mạng lưới được tiếp cận giai đoạn đặt giữ chỗ sớm — lợi thế về giá và quyền chọn căn."
    ],
    "amenities": [
      "Công viên nội khu",
      "Hồ bơi tràn bờ",
      "Khu thể thao đa năng",
      "Sảnh đón đôi",
      "Khu vui chơi trẻ em",
      "Không gian làm việc chung"
    ]
  },
  {
    "id": "one-central-saigon",
    "name": "One Central Saigon",
    "developer": "Masterise Homes",
    "location": "Trung tâm Quận 1",
    "area": "Trung tâm",
    "segment": "Siêu sang",
    "type": "Căn hộ",
    "status": "Giao dịch kín",
    "offmarket": true,
    "badge": "Hiếm có",
    "priceText": "Liên hệ",
    "priceValue": 95,
    "beds": "2–4 PN",
    "size": "90 – 320 m²",
    "handover": "2027",
    "cover": "assets/img/media/one-central-saigon-1.jpg",
    "gallery": [
      "assets/img/media/one-central-saigon-1.jpg",
      "assets/img/media/one-central-saigon-2.jpg",
      "assets/img/media/one-central-saigon-3.jpg"
    ],
    "short": "Tài sản siêu sang ngay tứ giác vàng Quận 1 — một trong những quỹ căn khan hiếm nhất thị trường.",
    "description": [
      "One Central Saigon là dự án phức hợp siêu sang nằm tại vị trí đắt giá bậc nhất trung tâm Quận 1, kề Bến Thành. Số lượng căn hộ giới hạn, hướng tới giới tinh hoa và nhà sưu tầm bất động sản.",
      "Đây là nhóm sản phẩm 'private' đúng nghĩa — thông tin và mức giá chỉ chia sẻ trực tiếp cho khách hàng trong mạng lưới PaceLand."
    ],
    "amenities": [
      "Phòng chờ riêng",
      "Hồ bơi trên cao",
      "Hầm rượu",
      "Dịch vụ quản gia",
      "Khu để xe sang riêng",
      "Tầm nhìn Bến Thành – sông Sài Gòn"
    ]
  },
  {
    "id": "vinhomes-grand-park",
    "name": "Vinhomes Grand Park",
    "developer": "Vinhomes",
    "location": "TP. Thủ Đức",
    "area": "Khu Đông",
    "segment": "Cao cấp",
    "type": "Căn hộ",
    "status": "Đang mở bán",
    "offmarket": false,
    "badge": "Dòng tiền ổn định",
    "priceText": "Từ 8,0 tỉ",
    "priceValue": 8,
    "beds": "Studio – 3 PN",
    "size": "30 – 95 m²",
    "handover": "Bàn giao",
    "cover": "assets/img/media/vinhomes-grand-park-1.jpg",
    "gallery": [
      "assets/img/media/vinhomes-grand-park-1.jpg",
      "assets/img/media/vinhomes-grand-park-2.jpg",
      "assets/img/media/vinhomes-grand-park-3.jpg"
    ],
    "short": "Đại đô thị công viên với cộng đồng cư dân lớn — lựa chọn an toàn cho dòng tiền cho thuê ổn định.",
    "description": [
      "Vinhomes Grand Park là đại đô thị quy mô lớn tại Khu Đông với hệ tiện ích hoàn chỉnh và cộng đồng cư dân đông đúc, đảm bảo tỉ lệ lấp đầy cho thuê tốt.",
      "Phù hợp với nhà đầu tư ưu tiên dòng tiền an toàn và thanh khoản cao."
    ],
    "amenities": [
      "Công viên 36 ha",
      "Hồ thể thao",
      "Vinschool – Vinmec",
      "TTTM Vincom",
      "Tuyến buýt nội khu",
      "An ninh đa lớp"
    ]
  },
  {
    "id": "eco-retreat",
    "name": "Eco Retreat",
    "developer": "Ecopark",
    "location": "Bến Lức, Long An",
    "area": "Vùng ven & nghỉ dưỡng",
    "segment": "Nghỉ dưỡng",
    "type": "Biệt thự",
    "status": "Đang mở bán",
    "offmarket": false,
    "badge": "Ngôi nhà thứ hai",
    "priceText": "Từ 14 tỉ",
    "priceValue": 14,
    "beds": "Biệt thự đơn lập",
    "size": "180 – 360 m²",
    "handover": "2027",
    "cover": "assets/img/media/eco-retreat-1.jpg",
    "gallery": [
      "assets/img/media/eco-retreat-1.jpg",
      "assets/img/media/eco-retreat-2.jpg",
      "assets/img/media/eco-retreat-3.jpg"
    ],
    "short": "Đô thị xanh ven sông phong cách Ecopark, chỉ 30 phút về trung tâm — ngôi nhà thứ hai bên thiên nhiên.",
    "description": [
      "Eco Retreat mang triết lý đô thị xanh đặc trưng của Ecopark, mật độ cây xanh và mặt nước lớn, kết nối thuận tiện về TP.HCM qua cao tốc. Sản phẩm biệt thự phù hợp nhu cầu ngôi nhà thứ hai và tích sản.",
      "Không gian sống trong lành, cộng đồng tinh hoa — giá trị bền vững theo thời gian."
    ],
    "amenities": [
      "Công viên ven sông",
      "Bến du thuyền",
      "Khu thể thao nước",
      "Vườn nhiệt đới",
      "Nhà câu lạc bộ",
      "Đường dạo bộ 5 km"
    ]
  },
  {
    "id": "metropole-thu-thiem",
    "name": "The Metropole Thủ Thiêm",
    "developer": "SonKim Land",
    "location": "Khu đô thị Thủ Thiêm, TP. Thủ Đức",
    "area": "Khu Đông",
    "segment": "Siêu sang",
    "type": "Căn hộ",
    "status": "Giao dịch kín",
    "offmarket": true,
    "badge": "Biên lợi nhuận cao",
    "priceText": "Từ 18 tỉ",
    "priceValue": 18,
    "beds": "1–4 PN",
    "size": "55 – 220 m²",
    "handover": "Bàn giao",
    "cover": "assets/img/media/metropole-1.jpg",
    "gallery": [
      "assets/img/media/metropole-1.jpg",
      "assets/img/media/metropole-2.jpg",
      "assets/img/media/metropole-3.jpg"
    ],
    "short": "Chuẩn mực sống tinh hoa tại Thủ Thiêm — thiết kế tinh xảo, dịch vụ khách sạn, quỹ căn chuyển nhượng chọn lọc.",
    "description": [
      "The Metropole Thủ Thiêm là biểu tượng sống sang trọng do SonKim Land phát triển, nổi bật với thiết kế đẳng cấp và dịch vụ chuẩn khách sạn 5 sao.",
      "PaceLand tư vấn các căn chuyển nhượng vị trí đẹp với mức giá hợp lý — cơ hội sở hữu tài sản biểu tượng."
    ],
    "amenities": [
      "Hồ bơi chân mây",
      "Quản gia 5 sao",
      "Trung tâm thương mại",
      "Khu spa & gym",
      "Sảnh nghệ thuật",
      "An ninh tuyệt đối"
    ]
  },
  {
    "id": "palm-river",
    "name": "Palm River Residences",
    "developer": "Chủ đầu tư uy tín",
    "location": "Ven sông Khu Nam, TP.HCM",
    "area": "Khu Nam",
    "segment": "Cao cấp",
    "type": "Biệt thự",
    "status": "Sắp ra mắt",
    "offmarket": false,
    "badge": "Tiềm năng tăng giá",
    "priceText": "Từ 22 tỉ",
    "priceValue": 22,
    "beds": "Biệt thự song lập",
    "size": "200 – 420 m²",
    "handover": "2028",
    "cover": "assets/img/media/palm-river-1.jpg",
    "gallery": [
      "assets/img/media/palm-river-1.jpg",
      "assets/img/media/palm-river-2.jpg"
    ],
    "short": "Compound biệt thự ven sông Khu Nam — không gian riêng tư, mật độ thấp, giá trị tích sản dài hạn.",
    "description": [
      "Palm River Residences là khu biệt thự compound ven sông tại Khu Nam, đề cao sự riêng tư và mật độ xây dựng thấp. Vị trí kết nối thuận tiện về Phú Mỹ Hưng và trung tâm.",
      "Quỹ sản phẩm giới hạn, phù hợp khách hàng tìm kiếm không gian sống riêng tư và biên độ tăng giá."
    ],
    "amenities": [
      "Bến thuyền riêng",
      "Công viên ven sông",
      "Cổng an ninh compound",
      "Hồ bơi nội khu",
      "Đường dạo bộ",
      "Khu thể thao"
    ]
  }
];

const POSTS = [
  {
    "id": "top-du-an-can-ho-cao-cap-tphcm-2026",
    "title": "Top dự án căn hộ cao cấp TP.HCM 2026: bảng so sánh theo khu vực",
    "category": "Thị trường",
    "date": "03/07/2026",
    "readtime": "9 phút đọc",
    "cover": "assets/img/media/the-prive-1.jpg",
    "excerpt": "Bảng so sánh 7 dự án căn hộ cao cấp đáng chú ý nhất TP.HCM 2026 theo giá, diện tích, thời điểm bàn giao — kèm gợi ý chọn theo từng mục tiêu: ở, tích sản hay dòng tiền.",
    "body": [
      { "t": "p", "c": "Nếu bạn chỉ có 30 giây: <b>The Privé</b> (Thủ Thiêm, từ 8,5 tỉ) và <b>Eaton Park</b> (An Phú, từ 9,2 tỉ) là hai dự án hạng sang đáng chú ý nhất đang mở bán; <b>One Central Saigon</b> và <b>The Metropole Thủ Thiêm</b> là lựa chọn siêu sang lõi trung tâm; còn <b>Gladia Heights</b> (từ 4,4 tỉ) là suất vào tầm giá tốt nhất cho người muốn đón hạ tầng Khu Đông. Bảng so sánh chi tiết bên dưới." },
      { "t": "p", "c": "Danh sách này dựa trên 4 tiêu chí PaceLand dùng khi thẩm định mọi dự án: vị trí và hạ tầng kết nối, năng lực chủ đầu tư, pháp lý, và dư địa chu kỳ giá. Phạm vi gồm các dự án PaceLand trực tiếp phân phối hoặc theo dõi dữ liệu giao dịch — cập nhật tháng 7/2026." },
      { "t": "h", "c": "Bảng so sánh nhanh 7 dự án tiêu biểu" },
      { "t": "table", "c": {
        "head": ["Dự án", "Khu vực", "Phân khúc", "Giá tham khảo", "Diện tích", "Bàn giao"],
        "rows": [
          ["<a href='/du-an/the-prive.html'>The Privé</a>", "Thủ Thiêm", "Hạng sang", "Từ 8,5 tỉ", "50–121 m²", "2027"],
          ["<a href='/du-an/eaton-park.html'>Eaton Park</a>", "An Phú, Khu Đông", "Hạng sang", "Từ 9,2 tỉ", "52–178 m²", "2027"],
          ["<a href='/du-an/one-central-saigon.html'>One Central Saigon</a>", "Quận 1", "Siêu sang", "Liên hệ", "90–320 m²", "2027"],
          ["<a href='/du-an/metropole-thu-thiem.html'>The Metropole Thủ Thiêm</a>", "Thủ Thiêm", "Siêu sang · chuyển nhượng", "Từ 18 tỉ", "55–220 m²", "Đã bàn giao"],
          ["<a href='/du-an/the-global-city.html'>The Global City</a>", "An Phú, Khu Đông", "Siêu sang · nhà phố TM", "Từ 42 tỉ", "100–280 m²", "2026"],
          ["<a href='/du-an/gladia-heights.html'>Gladia Heights</a>", "Cửa ngõ Đông Bắc", "Cao cấp", "Từ 4,4 tỉ", "48–110 m²", "2027"],
          ["<a href='/du-an/vinhomes-grand-park.html'>Vinhomes Grand Park</a>", "TP. Thủ Đức", "Cao cấp", "Từ 8,0 tỉ", "30–95 m²", "Đã bàn giao"]
        ]
      } },
      { "t": "h", "c": "Chọn theo mục tiêu của bạn" },
      { "t": "ul", "c": [
        "<b>Ở sang trọng, giữ giá bền:</b> The Privé hoặc Eaton Park — hai dự án hạng sang đang mở bán với chủ đầu tư mạnh và vị trí lõi Khu Đông",
        "<b>Tích sản biểu tượng, ngân sách lớn:</b> One Central Saigon (Quận 1) hoặc quỹ căn chuyển nhượng The Metropole — nguồn cung hiếm, giá trị sưu tầm",
        "<b>Ngân sách quanh 5 tỉ, đón hạ tầng:</b> Gladia Heights — giá vào thấp nhất danh sách, hưởng lợi trực tiếp Vành đai 3 và metro mở rộng",
        "<b>Dòng tiền cho thuê ổn định:</b> Vinhomes Grand Park — cộng đồng cư dân đông, tỉ lệ lấp đầy thuê cao, đã bàn giao"
      ] },
      { "t": "h", "c": "Ba lưu ý trước khi chốt" },
      { "t": "ul", "c": [
        "So sánh bằng đơn giá/m² giữa các dự án cùng khu vực, đừng so bằng tổng giá căn",
        "Pháp lý xét theo từng đợt mở bán, không theo danh tiếng dự án — luôn kiểm tra văn bản đủ điều kiện bán mới nhất",
        "Chính sách thanh toán và chiết khấu làm giá thực tế chênh nhau đáng kể giữa các đợt — hỏi giá thực thanh toán, không chỉ giá niêm yết"
      ] },
      { "t": "q", "c": "Dự án tốt nhất không phải dự án nổi tiếng nhất — mà là dự án đúng mục tiêu của bạn, mua ở mức giá đúng." },
      { "t": "h", "c": "Hỏi nhanh" },
      { "t": "ul", "c": [
        "<b>Giá trên đã là giá cuối chưa?</b> — Chưa; giá thực còn phụ thuộc chính sách từng đợt và vị trí căn. Để lại thông tin để nhận bảng giá chính xác tại thời điểm hỏi.",
        "<b>Mua trực tiếp chủ đầu tư có rẻ hơn qua PaceLand?</b> — Không; giá do chủ đầu tư niêm yết thống nhất, PaceLand không thu phí người mua và còn giữ suất ưu tiên giai đoạn sớm.",
        "<b>Danh sách này có được trả tiền để xếp hạng?</b> — Không; đây là danh mục thẩm định của PaceLand, tiêu chí công khai ở đầu bài."
      ] },
      { "t": "p", "c": "Số liệu trong bài là khoảng tham khảo tại tháng 7/2026 và có thể thay đổi theo giỏ hàng từng đợt. Để nhận bảng giá và quỹ căn chính xác hôm nay, gọi <b>0903 983 737</b> hoặc để lại thông tin tại <a href='/lien-he.html'>trang liên hệ</a> — tư vấn miễn phí, bảo mật." }
    ]
  },
  {
    "id": "bang-gia-can-ho-cao-cap-tphcm-theo-khu-vuc",
    "title": "Bảng giá căn hộ cao cấp TP.HCM theo khu vực (tham khảo 2026)",
    "category": "Thị trường",
    "date": "03/07/2026",
    "readtime": "7 phút đọc",
    "cover": "assets/img/media/one-central-saigon-1.jpg",
    "excerpt": "Đơn giá căn hộ cao cấp TP.HCM 2026 trải từ ~30 đến ~350 triệu/m² tuỳ khu vực. Bảng tổng hợp 7 khu vực chính kèm ước tính giá căn 2 phòng ngủ và cách đọc bảng cho đúng.",
    "body": [
      { "t": "p", "c": "Câu trả lời ngắn: đơn giá căn hộ cao cấp TP.HCM năm 2026 nằm trong khoảng <b>30–350 triệu đồng/m²</b> tuỳ khu vực. Cao nhất là lõi Quận 1 (150–350 triệu/m²), kế đến Thủ Thiêm (120–220), Thảo Điền – An Phú (85–140); vùng giá dễ tiếp cận nhất của phân khúc cao cấp là Khu Đông mở rộng (55–90) và vùng ven (30–55)." },
      { "t": "table", "c": {
        "head": ["Khu vực", "Đơn giá (triệu/m²)", "Căn 2PN ~70m² ước tính", "Đặc điểm"],
        "rows": [
          ["Quận 1 (lõi trung tâm)", "150–350", "10,5 – 24,5 tỉ", "Siêu sang, nguồn cung rất hiếm"],
          ["Thủ Thiêm", "120–220", "8,4 – 15,4 tỉ", "CBD mới, quỹ đất hữu hạn"],
          ["Thảo Điền – An Phú", "85–140", "6,0 – 9,8 tỉ", "Cộng đồng quốc tế, cầu thuê mạnh"],
          ["Trung tâm mở rộng (Bình Thạnh, Q3, Q10)", "75–130", "5,3 – 9,1 tỉ", "Gần lõi, nguồn cung đa dạng"],
          ["Khu Nam (Q7, Nhà Bè)", "60–110", "4,2 – 7,7 tỉ", "Phú Mỹ Hưng và dải ven sông"],
          ["Khu Đông khác (TP. Thủ Đức)", "55–90", "3,9 – 6,3 tỉ", "Đón metro và vành đai"],
          ["Vùng ven & tỉnh lân cận", "30–55", "2,1 – 3,9 tỉ", "Đô thị vệ tinh, nghỉ dưỡng"]
        ]
      } },
      { "t": "h", "c": "Cách đọc bảng giá cho đúng" },
      { "t": "p", "c": "Dải giá mỗi khu vực rộng vì ba lý do: vị trí lô đất trong khu (mặt sông, mặt công viên chênh hẳn phía trong), giai đoạn dự án (mở bán sớm rẻ hơn cận bàn giao), và chính sách bán từng đợt (chiết khấu thanh toán nhanh có thể tương đương giảm 5–10%). Vì vậy hãy dùng bảng này để định vị khu vực, còn quyết định mua bán cần con số của đúng toà, đúng căn." },
      { "t": "h", "c": "Yếu tố khiến căn của bạn lệch khỏi khoảng chung" },
      { "t": "ul", "c": [
        "Tầng cao, view đẹp: cộng khoảng 5–10% so với căn cùng loại",
        "Nội thất hoàn thiện đầy đủ: cộng khoảng 5%",
        "Pháp lý mới ở dạng hợp đồng mua bán (chưa sổ): trừ khoảng 5–10%",
        "Căn đã qua sử dụng: trừ khoảng 5–10% tuỳ hiện trạng"
      ] },
      { "t": "p", "c": "Bạn có thể tự ước tính giá trị một căn cụ thể theo đúng các hệ số trên bằng <a href='/cong-cu.html#dinh-gia'>công cụ định giá miễn phí</a> của PaceLand — chọn khu vực, loại hình, diện tích là có ngay khoảng giá." },
      { "t": "q", "c": "Bảng giá cho bạn biết mình đang đứng ở đâu. Giao dịch thực tế cho bạn biết mình nên trả bao nhiêu." },
      { "t": "h", "c": "Hỏi nhanh" },
      { "t": "ul", "c": [
        "<b>Số liệu này lấy từ đâu?</b> — Tổng hợp từ giỏ hàng các dự án PaceLand phân phối và dữ liệu giao dịch thị trường mà đội ngũ theo dõi; là khoảng tham khảo, không phải giá niêm yết của bất kỳ dự án cụ thể nào.",
        "<b>Bao lâu cập nhật một lần?</b> — PaceLand xem lại định kỳ; bản này phản ánh mặt bằng năm 2026. Giá điểm của từng dự án thay đổi theo đợt mở bán.",
        "<b>Muốn định giá chính xác căn đang có?</b> — Chuyên gia PaceLand thẩm định miễn phí dựa trên giao dịch thực tế cùng khu vực: gọi 0903 983 737."
      ] },
      { "t": "p", "c": "Cần bảng giá chi tiết của một dự án cụ thể? Để lại thông tin tại <a href='/lien-he.html'>trang liên hệ</a> hoặc gọi <b>0903 983 737</b> — cố vấn PaceLand gửi giỏ hàng và chính sách mới nhất trong ngày." }
    ]
  },
  {
    "id": "thu-thiem-2026-nguon-cung",
    "title": "Thủ Thiêm 2026: cuộc đua nguồn cung của những tên tuổi lớn",
    "category": "Thị trường",
    "date": "02/07/2026",
    "readtime": "7 phút đọc",
    "cover": "assets/img/media/metropole-2.jpg",
    "excerpt": "Quỹ đất Thủ Thiêm ngày càng khan hiếm trong khi các chủ đầu tư lớn đồng loạt ra hàng. Ai đang bán gì, và người mua nên đứng ở đâu trong cuộc đua này?",
    "body": [
      { "t": "p", "c": "Sau nhiều năm chờ đợi, Thủ Thiêm đang bước vào giai đoạn sôi động nhất kể từ khi quy hoạch bán đảo được phê duyệt. Hạ tầng kết nối về trung tâm đã hoàn thiện, các cây cầu và trục chính hoạt động ổn định, và quan trọng nhất: những chủ đầu tư uy tín nhất thị trường đều đã có mặt." },
      { "t": "p", "c": "Đại Quang Minh tiếp tục hoàn thiện khu đô thị Sala và ra mắt The Privé — bộ sưu tập căn hộ nhìn thẳng lõi trung tâm. SonKim Land đã bàn giao The Metropole và quỹ căn chuyển nhượng tại đây trở thành hàng hiếm được săn đón. Các lô đất ven sông còn lại đều đã có chủ với kế hoạch triển khai trong 2–3 năm tới." },
      { "t": "h", "c": "Vì sao nguồn cung Thủ Thiêm luôn khan" },
      { "t": "p", "c": "Khác với phần lớn khu vực, Thủ Thiêm có ranh giới quy hoạch cứng: tổng quỹ đất ở là hữu hạn và không thể mở rộng. Mỗi dự án mới ra mắt đồng nghĩa quỹ đất còn lại ít đi — đây là nền tảng của câu chuyện tăng giá dài hạn, thứ mà rất ít khu vực tại Việt Nam có được." },
      { "t": "q", "c": "Ở Thủ Thiêm, thứ khan hiếm không phải là căn hộ — mà là đất để xây căn hộ." },
      { "t": "p", "c": "Mặt bằng đơn giá căn hộ khu vực này hiện dao động quanh 120–220 triệu/m² tuỳ vị trí và giai đoạn bàn giao. Khoảng cách lớn giữa các dự án phản ánh đúng bản chất: vị trí lô đất, tầm nhìn và pháp lý từng dự án quyết định giá trị, không phải cái mác “Thủ Thiêm” chung chung." },
      { "t": "h", "c": "Người mua nên đứng ở đâu" },
      { "t": "ul", "c": [
        "Mua để ở dài hạn: ưu tiên dự án đã bàn giao, cộng đồng hình thành, pháp lý sạch",
        "Đầu tư tăng trưởng: theo dõi các đợt ra hàng sớm của dự án mới — biên lợi nhuận nằm ở quyền tiếp cận trước",
        "Dòng tiền cho thuê: nhắm tệp chuyên gia nước ngoài làm việc tại trung tâm, ưu tiên căn 1–2 phòng ngủ"
      ] },
      { "t": "p", "c": "PaceLand đang giữ một số căn vị trí đẹp tại Thủ Thiêm trong quỹ hàng giao dịch kín — được chia sẻ trực tiếp cho khách hàng trong mạng lưới trước khi công bố rộng rãi." }
    ]
  },
  {
    "id": "metro-so-1-sau-mot-nam-van-hanh",
    "title": "Metro số 1 sau hơn một năm vận hành: bất động sản dọc tuyến thay đổi thế nào?",
    "category": "Hạ tầng",
    "date": "30/06/2026",
    "readtime": "6 phút đọc",
    "cover": "assets/img/media/vinhomes-grand-park-2.jpg",
    "excerpt": "Tuyến Bến Thành – Suối Tiên đã chạy hơn một năm. Thói quen di chuyển thay đổi thật, nhưng không phải cứ gần ga là bất động sản tăng giá.",
    "body": [
      { "t": "p", "c": "Từ khi vận hành thương mại cuối năm 2024, Metro số 1 đã làm được điều quan trọng nhất: thay đổi thói quen di chuyển của một bộ phận cư dân phía Đông. Tuyến đường sắt đô thị đầu tiên của thành phố kết nối Bến Thành với Suối Tiên, chạy dọc trục xương sống của TP. Thủ Đức." },
      { "t": "p", "c": "Kinh nghiệm từ các đô thị châu Á cho thấy bất động sản trong bán kính đi bộ đến nhà ga thường thiết lập mặt bằng giá cao hơn khu vực lân cận từ 10–20% sau vài năm vận hành. TP.HCM đang đi đúng quỹ đạo đó, nhưng với một điều kiện quan trọng." },
      { "t": "h", "c": "Bán kính 800 mét — thước đo thực tế" },
      { "t": "p", "c": "Giá trị “gần metro” chỉ có nghĩa khi cư dân thực sự đi bộ được đến ga: khoảng 800 mét, tương đương 10 phút đi bộ. Xa hơn khoảng cách đó, metro chỉ còn là câu chuyện quảng cáo. Khi thẩm định một dự án “cạnh metro”, câu hỏi đầu tiên của PaceLand luôn là: từ sảnh toà nhà đến cửa soát vé mất bao nhiêu phút thật?" },
      { "t": "ul", "c": [
        "Cụm Thảo Điền – An Phú: hưởng lợi kép từ metro và cộng đồng quốc tế sẵn có",
        "Cụm Rạch Chiếc – Bình Thái: quỹ đất chuyển mình, nhiều dự án mới bám các nhà ga giữa tuyến",
        "Cụm Suối Tiên – khu Công nghệ cao: cầu thuê từ kỹ sư, chuyên gia và sinh viên Đại học Quốc gia"
      ] },
      { "t": "q", "c": "Metro không làm mọi dự án tăng giá — nó chỉ khuếch đại giá trị của những dự án vốn đã tốt." },
      { "t": "p", "c": "Bài học sau hơn một năm: các dự án chất lượng gần ga giữ giá và cho thuê tốt hơn rõ rệt, trong khi các dự án trung bình dù gần ga vẫn ì ạch. Hạ tầng là chất xúc tác, không phải phép màu. Sản phẩm, pháp lý và cộng đồng cư dân vẫn là gốc rễ của giá trị." }
    ]
  },
  {
    "id": "ban-do-5-cuc-tang-truong-khu-dong",
    "title": "Bản đồ 5 cực tăng trưởng của Khu Đông TP.HCM",
    "category": "Quy hoạch",
    "date": "28/06/2026",
    "readtime": "8 phút đọc",
    "cover": "assets/img/media/the-global-city-1.jpg",
    "excerpt": "Khu Đông không phải một thị trường đồng nhất. Năm cực tăng trưởng với động lực khác nhau đòi hỏi chiến lược xuống tiền khác nhau.",
    "body": [
      { "t": "p", "c": "“Khu Đông” là cách gọi tiện lợi nhưng dễ gây ngộ nhận: bên trong TP. Thủ Đức tồn tại ít nhất năm tiểu thị trường với động lực, mặt bằng giá và tệp khách khác hẳn nhau. Đặt sai sản phẩm vào sai cực, nhà đầu tư có thể chờ rất lâu mà không thấy thành quả." },
      { "t": "h", "c": "1. Thủ Thiêm — cực tài chính, giá trị biểu tượng" },
      { "t": "p", "c": "Quỹ đất hữu hạn, quy hoạch cứng, các chủ đầu tư hàng đầu. Đây là nơi dành cho tài sản tích luỹ dài hạn và những sản phẩm mang tính sưu tầm. Mặt bằng giá cao nhất Khu Đông và ít biến động theo sóng ngắn hạn." },
      { "t": "h", "c": "2. An Phú – Thảo Điền — cực lifestyle quốc tế" },
      { "t": "p", "c": "Cộng đồng nước ngoài, trường quốc tế, hệ sinh thái ẩm thực ven sông. The Global City đang định hình vai trò “downtown mới” với quảng trường và đại lộ thương mại. Cầu thuê bền là điểm mạnh nhất của cực này." },
      { "t": "h", "c": "3. Rạch Chiếc – Bình Thái — cực chuyển mình giữa tuyến" },
      { "t": "p", "c": "Bám metro và các trục mới mở, quỹ đất còn dư địa, nhiều dự án trung – cao cấp ra hàng. Phù hợp nhà đầu tư đi theo tiến độ hạ tầng với tầm nhìn 3–5 năm." },
      { "t": "h", "c": "4. Trường Thọ — cực đô thị sáng tạo" },
      { "t": "p", "c": "Khu cảng cũ được quy hoạch chuyển đổi thành đô thị mới ven sông. Câu chuyện dài hơi, biến số quy hoạch còn nhiều — biên an toàn nằm ở giá vốn thấp và sự kiên nhẫn." },
      { "t": "h", "c": "5. Vành đai Grand Park – cửa ngõ Đông Bắc — cực đại đô thị vệ tinh" },
      { "t": "p", "c": "Các đại đô thị như Vinhomes Grand Park đã tạo cộng đồng cư dân đông đúc thật; các dự án mới như Gladia Heights đón đầu vành đai và metro mở rộng với mức giá còn mềm. Đây là cực có mức giá vào thấp nhất và dư địa tăng theo hạ tầng rõ nhất." },
      { "t": "q", "c": "Không có “giá Khu Đông” — chỉ có giá của từng cực, từng dự án, từng thời điểm." },
      { "t": "p", "c": "Nguyên tắc của PaceLand: xác định cực phù hợp với mục tiêu (tích sản, dòng tiền hay tăng trưởng) trước, rồi mới chọn dự án. Đi ngược thứ tự đó là nguồn gốc của phần lớn quyết định sai." }
    ]
  },
  {
    "id": "chu-ky-gia-khu-dong-doc-dung-nhip",
    "title": "Chu kỳ giá Khu Đông: đọc đúng nhịp để không mua đỉnh",
    "category": "Góc nhìn PaceLand",
    "date": "26/06/2026",
    "readtime": "7 phút đọc",
    "cover": "assets/img/media/the-prive-2.jpg",
    "excerpt": "Giá bất động sản không đi theo đường thẳng mà theo nhịp của hạ tầng: công bố, khởi công, vận hành. Mua ở pha nào quyết định bạn lời hay kẹt.",
    "body": [
      { "t": "p", "c": "Mỗi công trình hạ tầng lớn tạo ra ba đợt sóng giá: khi quy hoạch được công bố, khi công trường khởi công, và khi công trình đi vào vận hành. Điều ít người để ý: phần tăng giá lớn nhất thường diễn ra ở pha giữa — khi máy móc đang chạy ngoài công trường — chứ không phải khi cắt băng khánh thành." },
      { "t": "h", "c": "Ba pha của một con sóng hạ tầng" },
      { "t": "ul", "c": [
        "Pha công bố: giá chạy theo tin, rủi ro cao nhất vì quy hoạch có thể điều chỉnh hoặc kéo dài",
        "Pha thi công: kỳ vọng chuyển thành hiện thực nhìn thấy được — dòng tiền lớn bắt đầu vào, giá tăng bền hơn",
        "Pha vận hành: mặt bằng giá mới được thiết lập; người mua cuối và người thuê trả tiền cho giá trị thật"
      ] },
      { "t": "p", "c": "Khu Đông hiện có đủ cả ba pha cùng lúc: metro số 1 đã vận hành (pha 3), Vành đai 3 đang thi công (pha 2), và các tuyến metro mở rộng còn ở giai đoạn quy hoạch (pha 1). Nghĩa là cùng một số tiền, bạn có thể chọn khẩu vị rủi ro rất khác nhau ngay trong một khu vực." },
      { "t": "q", "c": "Mua khi công trường đang chạy. Chốt lời khi mặt bằng giá mới được cả thị trường công nhận." },
      { "t": "h", "c": "Dấu hiệu một vùng giá đã nóng" },
      { "t": "ul", "c": [
        "Giao dịch thứ cấp chững lại nhưng giá chào vẫn tăng — người bán neo kỳ vọng, người mua không theo",
        "Tiền chênh giữ chỗ cao bất thường so với giá trị hợp đồng",
        "Câu chuyện tăng giá chỉ còn dựa vào một tin quy hoạch duy nhất"
      ] },
      { "t": "p", "c": "Khi cả ba dấu hiệu cùng xuất hiện, PaceLand thường khuyên khách dừng lại quan sát — cơ hội tốt tiếp theo luôn xuất hiện với người còn tiền trong tay. Kỷ luật với chu kỳ quan trọng hơn dự đoán chính xác đỉnh đáy." }
    ]
  },
  {
    "id": "thao-dien-an-phu-khu-lifestyle-giu-gia",
    "title": "Thảo Điền – An Phú: vì sao khu “lifestyle” giữ giá bền nhất Khu Đông?",
    "category": "Thị trường",
    "date": "24/06/2026",
    "readtime": "6 phút đọc",
    "cover": "assets/img/media/eaton-park-3.jpg",
    "excerpt": "Không phải hạ tầng hay quy hoạch — thứ giữ giá cho Thảo Điền – An Phú là một cộng đồng không dễ rời đi và nguồn cầu thuê gần như không bao giờ cạn.",
    "body": [
      { "t": "p", "c": "Trong các đợt thị trường điều chỉnh, Thảo Điền – An Phú luôn nằm trong nhóm giảm ít nhất và phục hồi sớm nhất Khu Đông. Lý do không nằm ở bản đồ quy hoạch, mà ở thứ khó sao chép hơn nhiều: một hệ sinh thái sống đã hoàn chỉnh." },
      { "t": "h", "c": "Cộng đồng là hào kinh tế" },
      { "t": "p", "c": "Trường quốc tế, phòng khám chuẩn quốc tế, chuỗi ẩm thực ven sông và một cộng đồng cư dân nước ngoài đông đảo tạo thành vòng xoáy tự củng cố: người nước ngoài mới đến chọn nơi có sẵn cộng đồng, dịch vụ mở thêm để phục vụ họ, và giá trị khu vực tiếp tục được bồi đắp. Vòng xoáy này cần cả thập kỷ để hình thành — đối thủ không thể xây bằng tiền trong vài năm." },
      { "t": "p", "c": "Nguồn cầu thuê từ chuyên gia nước ngoài giúp căn hộ khu này duy trì tỷ lệ lấp đầy cao và giá thuê ổn định ngay cả khi thị trường mua bán trầm lắng — tấm đệm dòng tiền mà ít khu vực nào có." },
      { "t": "h", "c": "Nguồn cung mới: ít và đắt" },
      { "t": "p", "c": "Quỹ đất trống gần như cạn. Số dự án mới đếm trên đầu ngón tay — Eaton Park trên mặt tiền Mai Chí Thọ là một trong số hiếm hoi — và đều định vị ở phân khúc cao. Nguồn cung khan trong khi cầu ở thực bền là công thức giữ giá kinh điển." },
      { "t": "q", "c": "Người ta có thể sao chép một toà nhà, nhưng không thể sao chép một cộng đồng." },
      { "t": "p", "c": "Điểm cần thẩm định kỹ khi mua tại đây: hiện trạng ngập cục bộ ở một số tuyến nội khu, chất lượng vận hành từng toà và mức chênh giá giữa các dự án cùng vị trí. Trả đúng giá cho đúng toà — đó là lúc dữ liệu giao dịch thực tế của PaceLand phát huy tác dụng." }
    ]
  },
  {
    "id": "vanh-dai-3-keo-gian-do-thi-phia-dong",
    "title": "Vành đai 3 và hiệu ứng kéo giãn đô thị về phía Đông",
    "category": "Hạ tầng",
    "date": "22/06/2026",
    "readtime": "6 phút đọc",
    "cover": "assets/img/media/gladia-heights-1.jpg",
    "excerpt": "Khi Vành đai 3 dần thành hình, ranh giới “nội đô – vùng ven” đang được vẽ lại. Cửa ngõ Đông Bắc là nơi hưởng hiệu ứng này rõ nhất.",
    "body": [
      { "t": "p", "c": "Vành đai 3 — khởi công giữa năm 2023 và đang dần hoàn thiện từng đoạn — không đơn thuần là một con đường. Nó là công cụ tái phân bố dân cư và việc làm của cả vùng TP.HCM mở rộng: kết nối Bình Dương, Đồng Nai, Long An vào một vòng tròn giao thương liền mạch." },
      { "t": "h", "c": "Hiệu ứng kéo giãn" },
      { "t": "p", "c": "Mỗi vành đai hoàn thành đều tạo ra một đợt “kéo giãn” đô thị: cư dân chấp nhận ở xa trung tâm hơn khi thời gian di chuyển giảm. Quỹ đất quanh các nút giao trở thành điểm rơi của dòng tiền — nơi đô thị mới, kho vận và thương mại dịch vụ mọc lên trước tiên." },
      { "t": "p", "c": "Tại phía Đông, hành lang hưởng lợi trực tiếp là dải cửa ngõ Đông Bắc — nơi Vành đai 3 giao cắt các trục hướng tâm. Các dự án đón đầu như Gladia Heights nằm trong nhóm này: mặt bằng giá còn mềm so với lõi Khu Đông, trong khi khoảng cách thời gian về trung tâm đang được rút ngắn từng quý." },
      { "t": "q", "c": "Hạ tầng không làm đất đẻ ra tiền — nó làm khoảng cách ngắn lại, và giá trị dịch chuyển theo." },
      { "t": "h", "c": "Ba câu hỏi trước khi mua theo vành đai" },
      { "t": "ul", "c": [
        "Đoạn tuyến đi qua khu vực đã thi công đến đâu — kỳ vọng phải bám tiến độ thật, không bám bản vẽ",
        "Pháp lý khu đất có sạch không, có nằm trong ranh dự án hạ tầng hay hành lang an toàn không",
        "Nếu tiến độ chậm 2–3 năm, phương án của bạn là gì — cho thuê được không, dòng tiền chịu được không"
      ] },
      { "t": "p", "c": "Mua theo hạ tầng là chiến lược đúng — với điều kiện có biên an toàn. PaceLand thẩm định tiến độ thực địa và pháp lý từng khu đất trước khi khuyến nghị, vì bản đồ quy hoạch và công trường ngoài đời không phải lúc nào cũng trùng nhau." }
    ]
  },
  {
    "id": "dong-tien-cho-thue-can-ho-khu-dong",
    "title": "Căn hộ Khu Đông cho thuê: bài toán dòng tiền không màu hồng nhưng có lời giải",
    "category": "Thị trường",
    "date": "20/06/2026",
    "readtime": "7 phút đọc",
    "cover": "assets/img/media/vinhomes-grand-park-1.jpg",
    "excerpt": "Lợi suất cho thuê căn hộ TP.HCM chỉ quanh 3–5%/năm. Vay càng nhiều, dòng tiền càng âm. Vậy nhà đầu tư dòng tiền nên chơi thế nào ở Khu Đông?",
    "body": [
      { "t": "p", "c": "Hãy bắt đầu bằng sự thật ít người quảng cáo nói ra: với mặt bằng giá hiện tại, lợi suất cho thuê gộp của căn hộ TP.HCM phổ biến ở mức 3–5%/năm — thấp hơn lãi suất vay. Nghĩa là nếu vay quá nửa giá trị căn hộ, dòng tiền hằng tháng của bạn gần như chắc chắn âm." },
      { "t": "p", "c": "Ví dụ minh hoạ: căn hộ 5 tỉ, cho thuê 25 triệu/tháng, vay 2,5 tỉ trong 20 năm — sau khi trừ tiền trả ngân hàng và chi phí vận hành, dòng tiền ròng âm khoảng vài triệu mỗi tháng. Bạn có thể tự kiểm tra con số của riêng mình bằng <a href='cong-cu.html#dong-tien'>công cụ dòng tiền cho thuê</a> của PaceLand." },
      { "t": "h", "c": "Vậy tại sao người ta vẫn mua?" },
      { "t": "p", "c": "Vì tổng lợi nhuận của bất động sản cho thuê = dòng tiền + tăng giá. Dòng tiền âm nhẹ có thể chấp nhận được nếu kỳ vọng tăng giá đủ lớn và chắc chắn. Vấn đề chỉ nảy sinh khi người mua nhầm một tài sản tăng trưởng thành tài sản dòng tiền — và vỡ kế hoạch tài chính vì khoản bù hằng tháng." },
      { "t": "h", "c": "Lời giải thực tế ở Khu Đông" },
      { "t": "ul", "c": [
        "Chọn nơi có cầu thuê thật: quanh khu Công nghệ cao, Đại học Quốc gia và các đại đô thị đã đông dân như Vinhomes Grand Park",
        "Giữ tỷ lệ vay dưới 40–50% nếu mục tiêu là dòng tiền dương",
        "Ưu tiên căn 1–2 phòng ngủ, nội thất chuẩn cho thuê — tối ưu lợi suất trên mỗi đồng vốn",
        "Tính đủ chi phí: phí quản lý, bảo trì, thời gian trống giữa hai đợt khách"
      ] },
      { "t": "q", "c": "Dòng tiền âm không phải sai lầm — không biết trước nó sẽ âm mới là sai lầm." },
      { "t": "p", "c": "PaceLand đang giữ một số căn có sẵn hợp đồng thuê tại Khu Đông — dòng tiền chạy ngay từ ngày nhận nhà. Đó là điểm khởi đầu an toàn cho nhà đầu tư ưu tiên sự chắc chắn." }
    ]
  },
  {
    "id": "7-diem-phap-ly-mua-can-ho-khu-dong",
    "title": "Mua căn hộ Khu Đông lần đầu: 7 điểm pháp lý phải kiểm tra trước khi đặt cọc",
    "category": "Góc nhìn PaceLand",
    "date": "18/06/2026",
    "readtime": "8 phút đọc",
    "cover": "assets/img/media/the-prive-3.jpg",
    "excerpt": "Giấy tờ nói thật hơn lời quảng cáo. Danh sách 7 điểm pháp lý PaceLand luôn kiểm tra thay khách hàng trước khi một đồng cọc được chuyển đi.",
    "body": [
      { "t": "p", "c": "Phần lớn rủi ro khi mua căn hộ hình thành trong tương lai không nằm ở giá, mà nằm ở pháp lý. Tin tốt: gần như mọi rủi ro pháp lý đều kiểm tra được trước khi đặt cọc — nếu bạn biết phải hỏi đúng giấy tờ nào." },
      { "t": "h", "c": "Danh sách kiểm tra của PaceLand" },
      { "t": "ul", "c": [
        "1. Quy hoạch chi tiết 1/500 và giấy phép xây dựng: dự án được duyệt xây đúng cái đang quảng cáo không",
        "2. Văn bản đủ điều kiện bán nhà ở hình thành trong tương lai của Sở Xây dựng: thiếu văn bản này, mọi “hợp đồng” chỉ là thoả thuận giữ chỗ",
        "3. Bảo lãnh ngân hàng cho nghĩa vụ bàn giao: ngân hàng nào bảo lãnh, phạm vi đến đâu",
        "4. Tiến độ thanh toán so với tiến độ xây dựng: tiền đi trước công trình quá xa là rủi ro của bạn",
        "5. Điều khoản bàn giao và chế tài chậm bàn giao: mức phạt, thời hạn, quyền chấm dứt hợp đồng",
        "6. Kinh phí bảo trì 2% và phí quản lý dự kiến: ai giữ, chuyển giao thế nào khi có ban quản trị",
        "7. Lộ trình cấp sổ hồng: nghĩa vụ tài chính về đất của chủ đầu tư đã hoàn thành chưa"
      ] },
      { "t": "q", "c": "Chủ đầu tư uy tín không ngại đưa giấy tờ. Sự né tránh chính là câu trả lời." },
      { "t": "p", "c": "Ở Khu Đông, mặt bằng pháp lý nhìn chung tốt hơn nhiều khu vực nhờ sự hiện diện của các chủ đầu tư lớn — nhưng “nhìn chung” không bảo vệ được giao dịch cụ thể của bạn. Từng dự án, từng đợt mở bán vẫn phải soi từng văn bản." },
      { "t": "p", "c": "Toàn bộ 7 điểm trên nằm trong quy trình thẩm định tiêu chuẩn mà cố vấn PaceLand thực hiện thay khách hàng trước mọi khuyến nghị. Bạn không cần trở thành luật sư — bạn chỉ cần một đội ngũ coi việc đọc giấy tờ là công việc hằng ngày." }
    ]
  },
  {
    "id": "san-bay-long-thanh-truc-dong-luc-phia-dong",
    "title": "Sân bay Long Thành cất cánh: Khu Đông là cửa ngõ hưởng lợi đầu tiên",
    "category": "Quy hoạch",
    "date": "16/06/2026",
    "readtime": "6 phút đọc",
    "cover": "assets/img/media/the-global-city-2.jpg",
    "excerpt": "Khi sân bay lớn nhất nước đi vào khai thác, dòng người và hàng hoá sẽ chảy qua đâu? Câu trả lời nằm ở trục cao tốc phía Đông — và Khu Đông đứng ngay đầu trục.",
    "body": [
      { "t": "p", "c": "Sân bay quốc tế Long Thành giai đoạn 1 đang về đích với mục tiêu khai thác từ năm 2026. Với công suất thiết kế giai đoạn đầu 25 triệu lượt khách mỗi năm, đây là công trình hạ tầng có sức ảnh hưởng lớn nhất tới bản đồ bất động sản phía Nam trong thập kỷ này." },
      { "t": "h", "c": "Giá trị nằm ở trục, không nằm ở cạnh hàng rào" },
      { "t": "p", "c": "Ngộ nhận phổ biến nhất: “gần sân bay là tăng giá”. Thực tế các đô thị lớn cho thấy điều ngược lại — giá trị ở cạnh sân bay bị giới hạn bởi tiếng ồn và quy hoạch tĩnh không. Giá trị thật nằm dọc trục kết nối giữa sân bay và trung tâm kinh tế: nơi chuyên gia hàng không, logistics và dịch vụ chọn để sống." },
      { "t": "p", "c": "Trục đó chính là hành lang cao tốc TP.HCM – Long Thành – Dầu Giây đang được mở rộng, cộng hưởng với Vành đai 3 và trong tương lai là tuyến đường sắt kết nối. Khu Đông TP.HCM đứng ở đầu trục: mọi chuyến đi từ trung tâm ra sân bay đều đi xuyên qua nó." },
      { "t": "ul", "c": [
        "Căn hộ dọc trục Mai Chí Thọ – cao tốc: tệp thuê mới từ chuyên gia làm việc tại sân bay và các khu công nghiệp vệ tinh",
        "Khu Đông Bắc quanh nút giao vành đai: điểm rơi của kho vận, thương mại và nhà ở cho lực lượng lao động mới",
        "Bất động sản nghỉ dưỡng ven đô: hưởng lợi từ khách quốc tế trung chuyển qua Long Thành"
      ] },
      { "t": "q", "c": "Sân bay là nhà máy tạo việc làm — và việc làm là thứ nuôi giá bất động sản." },
      { "t": "p", "c": "Kịch bản đáng theo dõi nhất với nhà đầu tư Khu Đông không phải là ngày khánh thành, mà là nhịp tăng tần suất khai thác trong 2–3 năm sau đó. Dòng tiền thông minh đi trước dòng người — nhưng chỉ đi trước một bước, không đi trước một thập kỷ." }
    ]
  },
  {
    "id": "tp-thu-duc-5-nam-nhin-lai",
    "title": "TP. Thủ Đức sau 5 năm: kỳ vọng, thực tế và cơ hội cho người đi dài hạn",
    "category": "Quy hoạch",
    "date": "14/06/2026",
    "readtime": "8 phút đọc",
    "cover": "assets/img/media/metropole-3.jpg",
    "excerpt": "Nửa thập kỷ sau ngày thành lập, “thành phố trong thành phố” đầu tiên của Việt Nam đã làm được gì — và bài học nào cho người cầm tiền hôm nay?",
    "body": [
      { "t": "p", "c": "Đầu năm 2021, TP. Thủ Đức ra đời từ việc sáp nhập ba quận phía Đông với kỳ vọng trở thành “đô thị sáng tạo tương tác cao” — cực tăng trưởng đóng góp lớn cho kinh tế thành phố, dựa trên ba trụ: khu Công nghệ cao, Đại học Quốc gia và trung tâm tài chính Thủ Thiêm." },
      { "t": "h", "c": "5 năm nhìn lại: cái gì chạy, cái gì chậm" },
      { "t": "p", "c": "Phần “cứng” đã chuyển động thật sự: metro số 1 vận hành, Vành đai 3 thành hình, nút giao An Phú và các trục chính dần hoàn thiện, các đại đô thị đông dân lên từng năm. Bộ mặt đô thị phía Đông hôm nay khác hẳn năm 2021." },
      { "t": "p", "c": "Phần “mềm” đi chậm hơn: bộ máy hành chính, phân cấp ngân sách và các cơ chế đặc thù cần nhiều thời gian hơn kỳ vọng ban đầu. Trung tâm tài chính Thủ Thiêm vẫn đang trong giai đoạn xây nền móng thể chế. Đây là điều bình thường — không đô thị lớn nào trên thế giới hoàn thiện trong 5 năm." },
      { "t": "q", "c": "Đô thị lớn không được xây trong một nhiệm kỳ. Tài sản lớn cũng vậy." },
      { "t": "h", "c": "Bài học cho người cầm tiền" },
      { "t": "ul", "c": [
        "Đặt cược vào cụm việc làm hiện hữu (khu Công nghệ cao, Đại học Quốc gia, Thủ Thiêm) thay vì lời hứa quy hoạch",
        "Ưu tiên khu vực hạ tầng đã vận hành hoặc đang thi công — kỳ vọng xa hơn cần biên giá an toàn tương xứng",
        "Chọn chủ đầu tư đủ sức đi đường dài: dự án dở dang là rủi ro lớn nhất ở các vùng đô thị hoá nhanh",
        "Kiên nhẫn với chu kỳ 5–10 năm: phần thưởng của Thủ Đức dành cho người đi dài hạn"
      ] },
      { "t": "p", "c": "PaceLand tin rằng chương hay nhất của TP. Thủ Đức vẫn ở phía trước — và như mọi câu chuyện tăng trưởng, phần lợi nhuận tốt nhất thuộc về những người vào vị trí trước khi câu chuyện trở nên hiển nhiên với tất cả mọi người." }
    ]
  },
  {
    "id": "ban-dang-mua-o-gia-ban-le-hay-gia-co-hoi",
    "title": "Bạn đang mua ở giá bán lẻ hay giá cơ hội?",
    "category": "Góc nhìn PaceLand",
    "date": "12/06/2026",
    "readtime": "6 phút đọc",
    "cover": "assets/img/media/post-gia-co-hoi.jpg",
    "excerpt": "Khi một bất động sản xuất hiện trên báo mạng hay nền tảng đại chúng, biên lợi nhuận tốt nhất thường đã không còn. Vì sao quyền truy cập sớm lại quyết định lợi nhuận?",
    "body": [
      {
        "t": "p",
        "c": "Thị trường bất động sản tồn tại một thực tế ít người nói ra: bất bình đẳng thông tin. Khi một sản phẩm tốt được công bố rộng rãi, phần lớn biên độ lợi nhuận đã được những người tiếp cận sớm hấp thụ."
      },
      {
        "t": "q",
        "c": "Khi thị trường nhìn thấy, cơ hội đã thuộc về người khác."
      },
      {
        "t": "p",
        "c": "Người mua đại chúng thường trả 'giá bán lẻ' (retail price) ở giai đoạn cuối của chu kỳ truyền thông. Trong khi đó, 'giá cơ hội' chỉ dành cho những ai tiếp cận được dòng sản phẩm trước khi nó trở nên phổ biến."
      },
      {
        "t": "h",
        "c": "Vì sao tốc độ và dữ liệu quyết định"
      },
      {
        "t": "p",
        "c": "Một cơ hội tốt không tồn tại lâu. Nó thuộc về người có thông tin sớm hơn, thẩm định nhanh hơn và ra quyết định dứt khoát hơn. Đây chính là lý do PaceLand xây dựng một mạng lưới kín dựa trên dữ liệu và tốc độ."
      },
      {
        "t": "ul",
        "c": [
          "Tiếp cận sản phẩm giao dịch kín trước thị trường",
          "Thẩm định bằng dữ liệu thay vì cảm tính",
          "Ra quyết định trong khung thời gian có lợi nhất"
        ]
      },
      {
        "t": "p",
        "c": "Câu hỏi không phải là 'mua dự án nào', mà là 'bạn đang đứng ở phía nào của thông tin'."
      }
    ]
  },
  {
    "id": "10-phan-tram-tinh-hoa",
    "title": "Chỉ 10% bất động sản thực sự có dòng tiền dương",
    "category": "Thị trường",
    "date": "05/06/2026",
    "readtime": "5 phút đọc",
    "cover": "assets/img/media/post-10-percent.jpg",
    "excerpt": "90% sản phẩm trên thị trường là cạm bẫy thanh khoản. PaceLand chọn lọc 10% còn lại bằng một hệ tiêu chí khắt khe.",
    "body": [
      {
        "t": "p",
        "c": "Không phải bất động sản nào cũng là tài sản. Phần lớn sản phẩm chào bán rộng rãi có thanh khoản kém, dòng tiền âm hoặc biên độ tăng giá đã cạn."
      },
      {
        "t": "q",
        "c": "Không đại trà. Chỉ giá trị thực."
      },
      {
        "t": "p",
        "c": "PaceLand từ chối phần lớn sản phẩm để tập trung vào nhóm có tiềm năng tăng trưởng vượt trội hoặc dòng tiền dương rõ ràng — được đánh giá qua hệ thống dữ liệu về vị trí, pháp lý, chủ đầu tư và chu kỳ giá."
      },
      {
        "t": "h",
        "c": "Bộ lọc giá trị"
      },
      {
        "t": "ul",
        "c": [
          "Vị trí và hạ tầng kết nối",
          "Năng lực và uy tín chủ đầu tư",
          "Pháp lý minh bạch",
          "Dư địa tăng giá theo chu kỳ"
        ]
      },
      {
        "t": "p",
        "c": "Kết quả là một danh mục tinh gọn nhưng chất lượng — nơi mỗi sản phẩm đều có lý do để nằm trong đó."
      }
    ]
  },
  {
    "id": "ha-tang-khu-dong",
    "title": "Hạ tầng Khu Đông và làn sóng dịch chuyển tài sản",
    "category": "Hạ tầng",
    "date": "28/05/2026",
    "readtime": "7 phút đọc",
    "cover": "assets/img/media/post-ha-tang-khu-dong.jpg",
    "excerpt": "Vành đai 3, cao tốc Long Thành và metro mở rộng đang định hình lại bản đồ giá trị bất động sản phía Đông.",
    "body": [
      {
        "t": "p",
        "c": "Khu Đông TP.HCM tiếp tục là tâm điểm của dòng vốn nhờ loạt hạ tầng trọng điểm: Vành đai 3, cao tốc TP.HCM – Long Thành – Dầu Giây, và các tuyến metro mở rộng."
      },
      {
        "t": "p",
        "c": "Khi hạ tầng hoàn thiện, giá trị bất động sản dọc các trục kết nối thường ghi nhận mức tăng đáng kể. Đây là lúc dữ liệu quy hoạch trở thành lợi thế."
      },
      {
        "t": "h",
        "c": "Đọc hạ tầng để đi trước"
      },
      {
        "t": "ul",
        "c": [
          "Bám theo tiến độ thi công thực tế",
          "Ưu tiên dự án gần nút giao và nhà ga",
          "Đánh giá quỹ đất còn lại trong khu vực"
        ]
      },
      {
        "t": "p",
        "c": "PaceLand cập nhật liên tục bản đồ hạ tầng để đặt mỗi dự án vào đúng bối cảnh tăng trưởng của nó."
      }
    ]
  },
  {
    "id": "wealth-advisor-khac-cò-dat",
    "title": "Cố vấn tài sản khác môi giới truyền thống thế nào?",
    "category": "Công nghệ BĐS",
    "date": "20/05/2026",
    "readtime": "5 phút đọc",
    "cover": "assets/img/media/post-co-van-tai-san.jpg",
    "excerpt": "PaceLand không tuyển 'cò đất'. Đội ngũ là những cố vấn tài sản kết hợp công nghệ AI với chuyên môn con người.",
    "body": [
      {
        "t": "p",
        "c": "Sự khác biệt giữa một người bán hàng và một cố vấn tài sản nằm ở mục tiêu: một bên tối ưu giao dịch, một bên tối ưu lợi ích dài hạn của khách hàng."
      },
      {
        "t": "q",
        "c": "Chúng tôi không cạnh tranh bằng giá — chúng tôi cạnh tranh bằng giá trị."
      },
      {
        "t": "p",
        "c": "Cố vấn tài sản của PaceLand được trang bị dữ liệu thị trường, công cụ phân tích và quy trình thẩm định để tư vấn dựa trên bằng chứng, không phải cảm tính hay áp lực doanh số."
      },
      {
        "t": "h",
        "c": "Công nghệ phục vụ con người"
      },
      {
        "t": "p",
        "c": "Nền tảng AI & Dữ liệu chuẩn hoá hồ sơ dự án, phân tích chu kỳ giá và cá nhân hoá đề xuất, giúp cố vấn dành thời gian cho điều quan trọng nhất: hiểu đúng nhu cầu khách hàng."
      }
    ]
  },
  {
    "id": "tu-duy-doi-tac",
    "title": "Tư duy đối tác: từ sales đến đồng sở hữu",
    "category": "Góc nhìn PaceLand",
    "date": "14/05/2026",
    "readtime": "6 phút đọc",
    "cover": "assets/img/media/post-tu-duy-doi-tac.jpg",
    "excerpt": "Lộ trình 3 năm chuyển hoá từ cộng tác viên thành Đối tác cổ phần với cổ phần ưu đãi — khi thành công được chia sẻ.",
    "body": [
      {
        "t": "p",
        "c": "PaceLand tin rằng những người cùng kiến tạo giá trị xứng đáng cùng sở hữu thành quả. Đó là lý do mô hình đối tác được thiết kế quanh sự chia sẻ — doanh thu và cả cổ phần."
      },
      {
        "t": "q",
        "c": "Nếu đây là công ty của mình, mình sẽ làm gì?"
      },
      {
        "t": "p",
        "c": "Từ Kinh doanh trực tiếp hoặc Đối tác đại lý, một cá nhân có thể đi theo lộ trình 3 năm để trở thành Đối tác cổ phần, nhận cổ phần ưu đãi và tham gia vào sự phát triển dài hạn của công ty."
      },
      {
        "t": "h",
        "c": "Vì sao mô hình này bền vững"
      },
      {
        "t": "ul",
        "c": [
          "Lợi ích gắn với giá trị tạo ra cho khách hàng",
          "Văn hoá nói thật – làm thật",
          "Cùng thắng giữa công ty, đối tác và khách hàng"
        ]
      }
    ]
  },
  {
    "id": "chu-ky-gia-2026",
    "title": "Chu kỳ giá 2026: cơ hội vào sớm ở đâu?",
    "category": "Quy hoạch",
    "date": "02/05/2026",
    "readtime": "8 phút đọc",
    "cover": "assets/img/media/post-chu-ky-gia.jpg",
    "excerpt": "Phân tích chu kỳ giúp xác định thời điểm và khu vực có 'giá cơ hội' tốt nhất trong năm 2026.",
    "body": [
      {
        "t": "p",
        "c": "Mỗi khu vực và phân khúc có nhịp chu kỳ riêng. Mua đúng thời điểm trong chu kỳ quan trọng không kém việc chọn đúng sản phẩm."
      },
      {
        "t": "p",
        "c": "Năm 2026, dòng tiền có xu hướng tìm đến các khu vực hưởng lợi hạ tầng và sản phẩm có pháp lý sạch, biên độ tăng giá còn dư địa."
      },
      {
        "t": "h",
        "c": "Ba câu hỏi trước khi xuống tiền"
      },
      {
        "t": "ul",
        "c": [
          "Khu vực đang ở giai đoạn nào của chu kỳ?",
          "Sản phẩm có dòng tiền hay chỉ kỳ vọng tăng giá?",
          "Thanh khoản khi cần thoát hàng ra sao?"
        ]
      },
      {
        "t": "p",
        "c": "Trả lời được ba câu hỏi này, bạn đã đi trước phần lớn thị trường."
      }
    ]
  }
];

const VALUES = [
  {
    "n": "01",
    "t": "Tốc độ",
    "d": "Hành động nhanh, quyết định nhanh — cơ hội tốt không chờ đợi."
  },
  {
    "n": "02",
    "t": "Bứt phá",
    "d": "Không ngừng đổi mới và vượt qua giới hạn của chính mình."
  },
  {
    "n": "03",
    "t": "Uy tín",
    "d": "Nói thật – làm thật, giữ đúng lời hứa với khách hàng và đối tác."
  },
  {
    "n": "04",
    "t": "Giá trị",
    "d": "Tạo ra giá trị thực, bền vững thay vì cạnh tranh bằng giá."
  },
  {
    "n": "05",
    "t": "Thịnh vượng",
    "d": "Cùng phát triển, cùng thành công — cho khách hàng, đối tác và cộng đồng."
  }
];

const JOBS = [
  {
    "id": "chuyen-vien-tu-van",
    "title": "Chuyên viên Tư vấn Bất động sản",
    "dept": "Kinh doanh",
    "type": "Toàn thời gian",
    "location": "TP. Thủ Đức, TP.HCM",
    "salary": "Thu nhập 30 – 100+ triệu/tháng",
    "desc": "Tư vấn khách hàng cao cấp, khai thác quỹ hàng chọn lọc và giao dịch kín của PaceLand.",
    "reqs": [
      "Đam mê bất động sản & tài chính",
      "Kỹ năng giao tiếp tốt",
      "Tinh thần học hỏi, chủ động"
    ],
    "benefits": [
      "Hoa hồng lũy tiến 55–65%",
      "Nền tảng dữ liệu & nguồn khách hàng",
      "Lộ trình lên Đối tác cổ phần"
    ]
  },
  {
    "id": "truong-nhom-kinh-doanh",
    "title": "Trưởng nhóm Kinh doanh",
    "dept": "Kinh doanh",
    "type": "Toàn thời gian",
    "location": "TP. Thủ Đức, TP.HCM",
    "salary": "Thu nhập 50 – 150+ triệu/tháng",
    "desc": "Xây dựng và dẫn dắt đội ngũ tư vấn, phát triển tệp khách hàng tinh hoa.",
    "reqs": [
      "Kinh nghiệm quản lý đội nhóm bất động sản",
      "Thành tích bán hàng tốt",
      "Tư duy đối tác, cùng thắng"
    ],
    "benefits": [
      "Chính sách thưởng đội nhóm",
      "Cơ hội nhận cổ phần ưu đãi",
      "Đào tạo lãnh đạo"
    ]
  },
  {
    "id": "digital-marketing",
    "title": "Digital Marketing",
    "dept": "Tiếp thị & Công nghệ",
    "type": "Toàn thời gian",
    "location": "TP. Thủ Đức, TP.HCM",
    "salary": "Thoả thuận theo năng lực",
    "desc": "Triển khai tiếp thị số, nội dung và quảng cáo cho thương hiệu và các dự án.",
    "reqs": [
      "Kinh nghiệm tiếp thị số",
      "Thành thạo quảng cáo & nội dung",
      "Ưu tiên hiểu bất động sản"
    ],
    "benefits": [
      "Môi trường sáng tạo",
      "Công nghệ AI & dữ liệu",
      "Lương thưởng cạnh tranh"
    ]
  },
  {
    "id": "chuyen-vien-du-lieu",
    "title": "Chuyên viên Phân tích Dữ liệu",
    "dept": "Tiếp thị & Công nghệ",
    "type": "Toàn thời gian",
    "location": "TP. Thủ Đức, TP.HCM",
    "salary": "Thoả thuận theo năng lực",
    "desc": "Xây dựng và vận hành hệ dữ liệu thẩm định dự án, chu kỳ giá và khách hàng tiềm năng.",
    "reqs": [
      "Tư duy phân tích, làm việc với dữ liệu",
      "Biết Excel/SQL/BI cơ bản",
      "Cẩn thận, chủ động"
    ],
    "benefits": [
      "Tham gia xây nền tảng AI & dữ liệu",
      "Môi trường học hỏi",
      "Lộ trình phát triển rõ ràng"
    ]
  }
];

/* Chứng nhận Đối tác — danh bạ cố vấn/đối tác chính thức để khách hàng tra cứu xác minh.
   Quản lý trong Admin → Chứng nhận Đối tác. status: "active" (đang hợp tác) | "inactive" (đã ngừng). */
const PARTNERS = [
  {
    "id": "vo-van-phuoc",
    "code": "PL-0001",
    "name": "Võ Văn Phước",
    "role": "Nhà sáng lập & Chủ tịch",
    "level": "Ban lãnh đạo",
    "status": "active",
    "photo": "assets/img/founder.jpg",
    "since": "2021",
    "phone": "",
    "bio": "Nhà sáng lập PaceLand — người đặt nền móng cho mạng lưới bất động sản kín dựa trên dữ liệu và tốc độ.",
    "achievements": []
  }
];

const FAQS = [
  {
    "group": "Về PaceLand",
    "items": [
      {
        "q": "PaceLand là công ty gì?",
        "a": "PaceLand là mạng lưới bất động sản kín, kết nối khách hàng tinh hoa với những cơ hội bất động sản tốt nhất bằng dữ liệu và tốc độ."
      },
      {
        "q": "“Giao dịch kín” nghĩa là gì?",
        "a": "Là những sản phẩm chất lượng được chia sẻ trực tiếp cho khách hàng trong mạng lưới trước khi công bố rộng rãi — giúp bạn tiếp cận ở “giá cơ hội” thay vì “giá bán lẻ”."
      },
      {
        "q": "PaceLand khác môi giới truyền thống ở điểm nào?",
        "a": "Chúng tôi không phải “cò đất”. Đội ngũ là cố vấn tài sản, tư vấn dựa trên dữ liệu và lợi ích dài hạn của khách hàng, không chạy theo áp lực doanh số."
      }
    ]
  },
  {
    "group": "Mua căn hộ cao cấp TP.HCM",
    "items": [
      {
        "q": "Nên mua căn hộ cao cấp ở khu nào TP.HCM năm 2026?",
        "a": "Ba lựa chọn tiêu biểu theo mục tiêu: <b>Thủ Thiêm</b> cho tài sản dài hạn, giá trị biểu tượng (120–220 triệu/m²); <b>Thảo Điền – An Phú</b> cho ở thực và cho thuê nhờ cộng đồng quốc tế (85–140 triệu/m²); <b>cửa ngõ Đông Bắc Khu Đông</b> cho nhà đầu tư đón hạ tầng với giá vào từ khoảng 4,4 tỉ/căn. Xem phân tích đầy đủ trong bài <a href='/bai-viet/ban-do-5-cuc-tang-truong-khu-dong.html'>Bản đồ 5 cực tăng trưởng của Khu Đông</a>."
      },
      {
        "q": "Có khoảng 5 tỉ thì mua được căn hộ cao cấp nào?",
        "a": "Trong tầm 5 tỉ, lựa chọn tiêu biểu là căn 1 phòng ngủ tại Gladia Heights (từ 4,4 tỉ, bàn giao 2027, cửa ngõ Đông Bắc) hoặc căn studio–1PN chuyển nhượng tại các đại đô thị Khu Đông. Phân khúc lõi như Thủ Thiêm, Quận 1 thường bắt đầu từ 8–9 tỉ cho căn nhỏ nhất."
      },
      {
        "q": "Ngân sách 8–10 tỉ mua được gì ở phân khúc hạng sang?",
        "a": "Đây là tầm giá vào của căn 1–2 phòng ngủ tại các dự án hạng sang Khu Đông: The Privé Thủ Thiêm (từ 8,5 tỉ) và Eaton Park An Phú (từ 9,2 tỉ) — đủ để sở hữu địa chỉ đẳng cấp với khả năng giữ giá tốt."
      },
      {
        "q": "Nên mua căn hộ mới từ chủ đầu tư hay căn chuyển nhượng?",
        "a": "Mua mới: giá gốc, thanh toán giãn theo tiến độ, được chọn căn sớm. Chuyển nhượng: nhận nhà ngay, thấy thực tế vận hành toà nhà, và đôi khi mua được dưới giá thị trường từ người cần bán nhanh — nhóm hàng PaceLand theo dõi liên tục trong mạng lưới kín."
      },
      {
        "q": "Thời điểm nào là tốt để mua căn hộ cao cấp?",
        "a": "Theo khung chu kỳ: giá tăng bền nhất khi hạ tầng đang thi công, không phải khi mới công bố hay đã khánh thành. Năm 2026, Vành đai 3 và các tuyến metro mở rộng đang triển khai — điểm giữa chu kỳ của Khu Đông. Quan trọng hơn thời điểm là mua đúng dự án, đúng giá."
      },
      {
        "q": "Dự án căn hộ nào đáng chú ý nhất TP.HCM hiện nay?",
        "a": "Danh mục chọn lọc của PaceLand hiện gồm: The Privé (Thủ Thiêm), Eaton Park (An Phú), One Central Saigon (Quận 1), The Metropole Thủ Thiêm (chuyển nhượng), The Global City, Gladia Heights (Đông Bắc) và Vinhomes Grand Park. Xem bảng so sánh chi tiết trong bài <a href='/bai-viet/top-du-an-can-ho-cao-cap-tphcm-2026.html'>Top dự án căn hộ cao cấp TP.HCM 2026</a>."
      }
    ]
  },
  {
    "group": "Giá căn hộ theo khu vực",
    "items": [
      {
        "q": "Giá căn hộ Thủ Thiêm hiện bao nhiêu?",
        "a": "Khoảng tham khảo 2026: 120–220 triệu/m² tuỳ dự án, vị trí lô đất và giai đoạn bàn giao. Căn 1PN khoảng 50m² bắt đầu từ ~8,5 tỉ. Dải giá rộng vì tầm nhìn và pháp lý từng lô quyết định rất lớn."
      },
      {
        "q": "Giá căn hộ Quận 1 bao nhiêu 1m²?",
        "a": "Phân khúc siêu sang lõi trung tâm: 150–350 triệu/m². Nguồn cung rất hiếm — tiêu biểu là One Central Saigon; nhiều giao dịch diễn ra kín, không niêm yết công khai."
      },
      {
        "q": "Giá căn hộ Thảo Điền – An Phú?",
        "a": "Khoảng 85–140 triệu/m² (2026). Dự án mới tiêu biểu là Eaton Park từ ~9,2 tỉ/căn. Khu này giữ giá bền nhờ cộng đồng quốc tế và nguồn cầu thuê ổn định."
      },
      {
        "q": "Khu Đông còn chỗ nào giá mềm không?",
        "a": "Có — vành đai Grand Park và cửa ngõ Đông Bắc: 55–90 triệu/m², căn hộ mới từ 4,4 tỉ (Gladia Heights). Đây là vùng giá vào thấp nhất Khu Đông và có câu chuyện hạ tầng rõ ràng nhất (Vành đai 3, metro mở rộng)."
      },
      {
        "q": "Xem bảng giá đầy đủ các khu vực ở đâu?",
        "a": "Bài <a href='/bai-viet/bang-gia-can-ho-cao-cap-tphcm-theo-khu-vuc.html'>Bảng giá căn hộ cao cấp TP.HCM theo khu vực</a> tổng hợp đơn giá 7 khu vực chính. Muốn ước tính cho một căn cụ thể, dùng <a href='/cong-cu.html#dinh-gia'>công cụ định giá</a> miễn phí của PaceLand."
      }
    ]
  },
  {
    "group": "Đầu tư & cho thuê",
    "items": [
      {
        "q": "Lợi suất cho thuê căn hộ TP.HCM được bao nhiêu?",
        "a": "Phổ biến 3–5%/năm (lợi suất gộp) trên giá trị căn hộ. Khu có cầu thuê mạnh từ chuyên gia nước ngoài như Thảo Điền – An Phú thường ở cận trên. Tổng lợi nhuận thực tế = dòng tiền thuê + mức tăng giá của tài sản."
      },
      {
        "q": "Nên mua căn hộ nào để cho thuê tốt?",
        "a": "Căn 1–2 phòng ngủ gần cụm việc làm: Thảo Điền – An Phú (chuyên gia nước ngoài), quanh khu Công nghệ cao và Đại học Quốc gia, hoặc các đại đô thị đông dân như Vinhomes Grand Park. Ưu tiên căn đã có sẵn hợp đồng thuê — dòng tiền chạy ngay từ ngày nhận nhà."
      },
      {
        "q": "Dòng tiền âm có nên mua không?",
        "a": "Chấp nhận được với 2 điều kiện: bạn biết trước và chịu được khoản bù hằng tháng, và kỳ vọng tăng giá dựa trên hạ tầng thật đang thi công. Kiểm tra con số của bạn trước khi quyết định bằng <a href='/cong-cu.html#dong-tien'>công cụ dòng tiền cho thuê</a>."
      },
      {
        "q": "Khu vực nào tiềm năng tăng giá nhất?",
        "a": "Theo khung chu kỳ của PaceLand: vùng đang hưởng hạ tầng thi công — cửa ngõ Đông Bắc (Vành đai 3) và dải giữa tuyến metro — có dư địa tăng theo hạ tầng rõ nhất; Thủ Thiêm tăng chậm hơn nhưng bền hơn nhờ nguồn cung hữu hạn."
      },
      {
        "q": "Đầu tư lướt sóng ngắn hạn căn hộ được không?",
        "a": "PaceLand không khuyến khích với phần lớn khách hàng: chi phí giao dịch, thuế và thời gian chờ pháp lý ăn mòn biên lợi nhuận ngắn hạn. Giá trị của căn hộ cao cấp nằm ở chu kỳ 3–7 năm; ngoại lệ là các suất mua sớm giá tốt trong mạng lưới."
      }
    ]
  },
  {
    "group": "Vay & tài chính",
    "items": [
      {
        "q": "Lãi suất vay mua nhà hiện nay bao nhiêu?",
        "a": "Tham khảo 2026: khoảng 6–8%/năm ưu đãi trong 1–2 năm đầu, sau đó thả nổi 10–12%/năm tuỳ ngân hàng. Khác biệt lớn nằm ở biên độ thả nổi và phí trả nợ trước hạn — PaceLand hỗ trợ so sánh gói vay phù hợp hồ sơ của bạn."
      },
      {
        "q": "Vay được tối đa bao nhiêu % giá trị căn hộ?",
        "a": "Thông thường tới 70% giá trị (một số dự án liên kết ngân hàng cho vay 80–85% giá trị hợp đồng). Khuyến nghị an toàn của PaceLand: vay không quá 50% nếu mua đầu tư, không quá 60–70% nếu mua ở với thu nhập ổn định."
      },
      {
        "q": "Thu nhập bao nhiêu thì mua được căn hộ 5 tỉ?",
        "a": "Quy tắc nhanh: khoản trả ngân hàng không nên vượt 40% thu nhập. Ví dụ vay 2,5 tỉ trong 20 năm, lãi trung bình ~10%/năm: trả ~24–25 triệu/tháng → thu nhập hộ gia đình nên từ ~60 triệu/tháng. Tự tính chính xác bằng <a href='/cong-cu.html#lai-vay'>công cụ tính lãi vay</a>."
      },
      {
        "q": "Nên trả nợ kiểu dư nợ giảm dần hay trả đều hằng tháng?",
        "a": "Dư nợ giảm dần: tổng lãi thấp hơn nhưng các tháng đầu nặng. Trả đều: dễ dự trù, nhẹ giai đoạn đầu, tổng lãi cao hơn. Người mua cho thuê thường chọn trả đều để cân dòng tiền; người mua ở thu nhập cao chọn giảm dần để tiết kiệm lãi."
      }
    ]
  },
  {
    "group": "Pháp lý & quy trình",
    "items": [
      {
        "q": "Trước khi đặt cọc cần kiểm tra giấy tờ gì?",
        "a": "7 điểm cốt lõi: quy hoạch 1/500 và giấy phép xây dựng; văn bản đủ điều kiện bán của Sở Xây dựng; bảo lãnh ngân hàng; tiến độ thanh toán so với tiến độ xây; điều khoản bàn giao và chế tài; kinh phí bảo trì 2%; lộ trình sổ hồng. Chi tiết trong bài <a href='/bai-viet/7-diem-phap-ly-mua-can-ho-khu-dong.html'>7 điểm pháp lý phải kiểm tra</a> — PaceLand thẩm định miễn phí thay khách hàng."
      },
      {
        "q": "Người nước ngoài mua căn hộ tại Việt Nam được không?",
        "a": "Được — với các dự án thương mại được phép bán cho người nước ngoài, hạn mức 30% số căn mỗi toà nhà, thời hạn sở hữu 50 năm (có thể gia hạn). Trước khi cọc cần kiểm tra hạn mức (quota) còn lại của toà đó."
      },
      {
        "q": "Bao lâu sau khi nhận nhà thì có sổ hồng?",
        "a": "Thông thường 1–3 năm sau bàn giao, tuỳ tiến độ hoàn công và việc chủ đầu tư hoàn thành nghĩa vụ tài chính về đất. Đây là mục phải hỏi rõ và giữ bằng chứng văn bản trước khi mua."
      },
      {
        "q": "Quy trình mua qua PaceLand diễn ra thế nào?",
        "a": "4 bước: (1) nghe nhu cầu và ngân sách; (2) đề xuất 2–3 phương án kèm dữ liệu thẩm định; (3) xem thực tế và đàm phán giá; (4) đồng hành ký kết, thu xếp vay vốn, nhận nhà. Khách hàng không trả phí tư vấn."
      }
    ]
  },
  {
    "group": "Phong thuỷ & tuổi mua nhà",
    "items": [
      {
        "q": "Năm 2027 tuổi nào mua nhà đẹp?",
        "a": "Không có năm đẹp chung cho mọi người — năm đẹp là năm không phạm Kim Lâu, Hoang Ốc, Tam Tai theo tuổi mụ từng người. Tra miễn phí 8 năm tới cho đúng tuổi của bạn bằng <a href='/cong-cu.html#phong-thuy'>công cụ phong thuỷ</a> của PaceLand."
      },
      {
        "q": "Mua nhà hướng nào hợp tuổi?",
        "a": "Theo phái Bát trạch: người Đông tứ mệnh hợp hướng Bắc, Nam, Đông, Đông Nam; người Tây tứ mệnh hợp Tây, Tây Bắc, Tây Nam, Đông Bắc. Cung mệnh tính từ năm sinh và giới tính — <a href='/cong-cu.html#phong-thuy'>công cụ phong thuỷ</a> hiển thị la bàn 8 hướng tốt xấu cho tuổi của bạn."
      },
      {
        "q": "Phạm năm Kim Lâu có mua nhà được không?",
        "a": "Dân gian có cách “mượn tuổi” người hợp tuổi để đứng cọc và ký kết, hoặc dời thời điểm nhận nhà sang năm đẹp. Lưu ý: phong thuỷ là yếu tố văn hoá tham khảo — pháp lý và giá trị tài sản vẫn là gốc của quyết định."
      }
    ]
  },
  {
    "group": "Dành cho khách hàng",
    "items": [
      {
        "q": "Tôi cần ngân sách bao nhiêu để bắt đầu?",
        "a": "PaceLand tập trung phân khúc cao cấp với giá trị tài sản thường từ 4 tỉ trở lên, nhưng vẫn có thể tư vấn nhiều mức ngân sách khác nhau. Hãy liên hệ để được tư vấn phù hợp."
      },
      {
        "q": "Chi phí tư vấn như thế nào?",
        "a": "Khách hàng được tư vấn miễn phí. PaceLand nhận phí từ chủ đầu tư và đối tác theo chuẩn mực minh bạch."
      },
      {
        "q": "Thông tin của tôi có được bảo mật không?",
        "a": "Có. Bảo mật và riêng tư là nguyên tắc cốt lõi của PaceLand; chúng tôi không chia sẻ thông tin của bạn cho bên thứ ba."
      }
    ]
  },
  {
    "group": "Dành cho đối tác",
    "items": [
      {
        "q": "Làm sao để trở thành đối tác?",
        "a": "Bạn có thể đăng ký tại trang Đối tác hoặc Tuyển dụng. PaceLand có lộ trình từ Kinh doanh trực tiếp/Đối tác đại lý đến Đối tác cổ phần."
      },
      {
        "q": "Chính sách hoa hồng ra sao?",
        "a": "Hoa hồng lũy tiến thuộc nhóm cao nhất thị trường (55–70%), kèm cơ hội nhận cổ phần ưu đãi theo lộ trình 3 năm."
      }
    ]
  }
];

const PAGES = {
  "home": {
    "name": "Trang chủ",
    "fields": [
      {
        "k": "hero_eyebrow",
        "label": "Hero · nhãn trên",
        "value": "Mạng lưới bất động sản kín"
      },
      {
        "k": "hero_t1",
        "label": "Hero · tiêu đề dòng 1",
        "value": "Biết trước số đông."
      },
      {
        "k": "hero_t2",
        "label": "Hero · tiêu đề dòng 2 (nghiêng đỏ)",
        "value": "Mua dưới giá thị trường."
      },
      {
        "k": "hero_sub",
        "label": "Hero · mô tả",
        "type": "textarea",
        "value": "PaceLand kết nối khách hàng tinh hoa với những cơ hội bất động sản tốt nhất — tiếp cận quỹ hàng giao dịch kín hạng sang bằng dữ liệu và tốc độ, trước khi thị trường kịp phản ứng."
      },
      {
        "k": "featured_title",
        "label": "Dự án nổi bật · tiêu đề",
        "value": "Cơ hội nổi bật trong mạng lưới"
      },
      {
        "k": "cta_title",
        "label": "CTA cuối · tiêu đề",
        "value": "Mở quyền truy cập quỹ hàng giao dịch kín của PaceLand"
      },
      {
        "k": "cta_sub",
        "label": "CTA cuối · mô tả",
        "type": "textarea",
        "value": "Để lại thông tin để Cố vấn tài sản liên hệ tư vấn riêng — bảo mật, không áp lực, đúng nhu cầu tài sản của bạn."
      }
    ]
  },
  "about": {
    "name": "Giới thiệu",
    "fields": [
      {
        "k": "hero_eyebrow",
        "label": "Hero · nhãn trên",
        "value": "Về PaceLand"
      },
      {
        "k": "hero_t1",
        "label": "Hero · tiêu đề dòng 1",
        "value": "Chúng tôi không chỉ bán bất động sản —"
      },
      {
        "k": "hero_t2",
        "label": "Hero · tiêu đề dòng 2 (nghiêng đỏ)",
        "value": "chúng tôi kiến tạo và quản lý tài sản."
      },
      {
        "k": "hero_sub",
        "label": "Hero · mô tả",
        "type": "textarea",
        "value": "PaceLand là một mạng lưới bất động sản kín — nơi khách hàng tinh hoa tiếp cận những cơ hội tốt nhất bằng dữ liệu, tốc độ và một chuẩn mực phục vụ riêng tư."
      },
      {
        "k": "founder_quote",
        "label": "Nhà sáng lập · trích dẫn",
        "type": "textarea",
        "value": "\"Chúng ta không tìm người làm thuê. Chúng ta tìm những người cùng kiến tạo giá trị. Nếu đây là công ty của mình, mình sẽ làm gì?\""
      },
      {
        "k": "founder_name",
        "label": "Nhà sáng lập · tên",
        "value": "Võ Văn Phước"
      },
      {
        "k": "founder_role",
        "label": "Nhà sáng lập · chức danh",
        "value": "Nhà sáng lập & Chủ tịch PaceLand"
      }
    ]
  },
  "partner": {
    "name": "Đối tác",
    "fields": [
      {
        "k": "hero_eyebrow",
        "label": "Hero · nhãn trên",
        "value": "Tư duy đối tác"
      },
      {
        "k": "hero_t1",
        "label": "Hero · tiêu đề dòng 1",
        "value": "Từ cộng tác viên"
      },
      {
        "k": "hero_t2",
        "label": "Hero · tiêu đề dòng 2 (nghiêng đỏ)",
        "value": "đến đồng sở hữu."
      },
      {
        "k": "hero_sub",
        "label": "Hero · mô tả",
        "type": "textarea",
        "value": "PaceLand tin rằng những người cùng kiến tạo giá trị xứng đáng cùng sở hữu thành quả. Mô hình đối tác được thiết kế quanh sự chia sẻ — doanh thu và cả cổ phần."
      }
    ]
  },
  "careers": {
    "name": "Tuyển dụng",
    "fields": [
      {
        "k": "hero_eyebrow",
        "label": "Hero · nhãn trên",
        "value": "Gia nhập PaceLand"
      },
      {
        "k": "hero_t1",
        "label": "Hero · tiêu đề dòng 1",
        "value": "Chúng ta không tìm người làm thuê."
      },
      {
        "k": "hero_t2",
        "label": "Hero · tiêu đề dòng 2 (nghiêng đỏ)",
        "value": "Chúng ta tìm người cùng kiến tạo."
      },
      {
        "k": "hero_sub",
        "label": "Hero · mô tả",
        "type": "textarea",
        "value": "Tại PaceLand, mỗi cá nhân đều có lộ trình rõ ràng để phát triển — từ cộng tác viên đến đồng sở hữu. Thu nhập xứng đáng, văn hoá nói thật làm thật, và một sứ mệnh đáng để theo đuổi."
      }
    ]
  },
  "faq": {
    "name": "Câu hỏi (FAQ)",
    "fields": [
      {
        "k": "hero_eyebrow",
        "label": "Hero · nhãn trên",
        "value": "Giải đáp"
      },
      {
        "k": "hero_t1",
        "label": "Hero · tiêu đề dòng 1",
        "value": "Câu hỏi"
      },
      {
        "k": "hero_t2",
        "label": "Hero · tiêu đề dòng 2 (nghiêng đỏ)",
        "value": "thường gặp."
      },
      {
        "k": "hero_sub",
        "label": "Hero · mô tả",
        "type": "textarea",
        "value": "Những điều bạn có thể muốn biết về PaceLand, dịch vụ và cách chúng tôi làm việc. Chưa thấy câu trả lời? Hãy liên hệ với chúng tôi."
      }
    ]
  },
  "contact": {
    "name": "Liên hệ",
    "fields": [
      {
        "k": "hero_eyebrow",
        "label": "Hero · nhãn trên",
        "value": "Tư vấn riêng tư"
      },
      {
        "k": "hero_t1",
        "label": "Hero · tiêu đề dòng 1",
        "value": "Bắt đầu một"
      },
      {
        "k": "hero_t2",
        "label": "Hero · tiêu đề dòng 2 (nghiêng đỏ)",
        "value": "cuộc trò chuyện riêng."
      },
      {
        "k": "hero_sub",
        "label": "Hero · mô tả",
        "type": "textarea",
        "value": "Để lại thông tin để một Cố vấn tài sản của PaceLand liên hệ — bảo mật, không áp lực, đúng nhu cầu tài sản của bạn."
      }
    ]
  }
};

const HERO_SLIDES = [
  {
    "img": "https://res.cloudinary.com/dtrwtahme/image/upload/v1782397963/gtwthbx61lhowu5hsopp.png",
    "caption": "Paceland 1"
  },
  {
    "img": "https://res.cloudinary.com/dtrwtahme/image/upload/v1782397982/qccww2lkapjlvtvfms5e.png",
    "caption": "Red dot"
  },
  {
    "img": "https://res.cloudinary.com/dtrwtahme/image/upload/v1782398000/zgeedkvnbfrr1gooep5q.png",
    "caption": "Thị trường CBD"
  },
  {
    "img": "https://res.cloudinary.com/dtrwtahme/image/upload/v1782398016/zdmmmmsewjzimghxjioo.png",
    "caption": "Cao cấp"
  },
  {
    "img": "https://res.cloudinary.com/dtrwtahme/image/upload/v1782398026/fkvt3vbxkgoino5ccyd0.png",
    "caption": "Căn hộ"
  }
];

const HERO_SLIDES_REPO = "khaibaodai/paceland-website";
const HERO_SLIDES_BRANCH = "main";

if (typeof window !== "undefined") {
  window.SITE = SITE; window.NAV = NAV; window.PROJECTS = PROJECTS; window.POSTS = POSTS; window.FILTERS = FILTERS; window.VALUES = VALUES; window.JOBS = JOBS; window.PARTNERS = PARTNERS; window.FAQS = FAQS; window.PAGES = PAGES; window.HERO_SLIDES = HERO_SLIDES; window.HERO_SLIDES_REPO = HERO_SLIDES_REPO; window.HERO_SLIDES_BRANCH = HERO_SLIDES_BRANCH; window.ph = ph;
}

/* CMS override */
(function () {
  if (typeof window === 'undefined') return;
  try {
    var cms = JSON.parse(localStorage.getItem('pl_cms') || 'null');
    if (!cms) return;
    if (cms.site) Object.assign(SITE, cms.site);
    function r(a, d) { if (Array.isArray(d)) { a.length = 0; d.forEach(function (x) { a.push(x); }); } }
    var hasOldCovers = Array.isArray(cms.projects) && cms.projects.some(function (p) {
      return p.cover && /^\d{8,}-[0-9a-f]{8,}$/i.test(p.cover);
    });
    if (!hasOldCovers) {
      r(PROJECTS, cms.projects);
      /* Bài viết: gộp theo id — bài mới trong data.js không bị bản lưu cũ đè mất */
      if (Array.isArray(cms.posts)) {
        var seedPosts = POSTS.slice();
        r(POSTS, cms.posts);
        var addedPost = false;
        seedPosts.forEach(function (sp) {
          var dup = false;
          for (var i = 0; i < POSTS.length; i++) { if (POSTS[i].id === sp.id) { dup = true; break; } }
          if (!dup) { POSTS.push(sp); addedPost = true; }
        });
        if (addedPost) POSTS.sort(function (a, b) {
          function ts(d) { var m = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(d || ""); return m ? +(m[3] + m[2] + m[1]) : 0; }
          return ts(b.date) - ts(a.date);
        });
      }
    }
    r(JOBS, cms.jobs);
    r(PARTNERS, cms.partners);
    /* FAQ: gộp theo tên nhóm — nhóm mới trong data.js không bị bản lưu cũ đè */
    if (Array.isArray(cms.faqs)) {
      var seedFaqs = FAQS.slice();
      r(FAQS, cms.faqs);
      seedFaqs.forEach(function (sg) {
        var dup = false;
        for (var j = 0; j < FAQS.length; j++) { if (FAQS[j].group === sg.group) { dup = true; break; } }
        if (!dup) FAQS.push(sg);
      });
    }
    if (cms.pages) { for (var pg in cms.pages) { if (PAGES[pg]) PAGES[pg].fields.forEach(function (f) { if (cms.pages[pg][f.k] != null) f.value = cms.pages[pg][f.k]; }); } }
    if (cms.heroSlides) r(HERO_SLIDES, cms.heroSlides);
    window.SITE = SITE; window.PROJECTS = PROJECTS; window.POSTS = POSTS; window.JOBS = JOBS; window.PARTNERS = PARTNERS; window.FAQS = FAQS; window.PAGES = PAGES; window.HERO_SLIDES = HERO_SLIDES;
  } catch (e) {}
})();
