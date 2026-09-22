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
  "zaloOA": "https://zalo.me/3109488145387221549",
  "facebook": "https://www.facebook.com/paceland.vn/",
  "youtube": "https://www.youtube.com/@paceland-vn",
  "tiktok": "https://www.tiktok.com/@paceland.vn",
  "formEndpoint": "https://formspree.io/f/mjgnvwqk",
  "leadEndpoint": "",
  "careersEndpoint": "",
  "thankYouPage": "/cam-on.html",
  "tracking": {
    "ga4": "",
    "adsId": "",
    "adsLabel": "",
    "metaPixel": "1801986410923640",
    "metaPixelScope": [
      "/cam-on",
      "/beachtro-blanca-city",
      "/gio-hang/beachtro-blanca-city",
      "/du-an/blanca-city",
      "/du-an/five-star-odyssey",
      "/du-an/five-star-poseidon",
      "/du-an/solina-vung-tau"
    ],
    "tiktokPixel": ""
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
    "developer": "Bluemarq Group (tiền thân Tập đoàn Đất Xanh)",
    "location": "Nam Rạch Chiếc, P. An Phú (cũ), TP. Thủ Đức",
    "area": "Khu Đông",
    "segment": "Hạng sang",
    "type": "Căn hộ",
    "status": "Đang mở bán",
    "offmarket": false,
    "badge": "2 mặt sông Giồng Ông Tố",
    "priceText": "Từ ~6,6 tỉ",
    "priceValue": 6.6,
    "beds": "1–3 PN, Duplex & Penthouse",
    "size": "49,8 – 98,5 m²",
    "handover": "Đang cập nhật",
    "cover": "assets/img/media/the-prive-2.jpg",
    "gallery": [
      "assets/img/media/the-prive-1.jpg",
      "assets/img/media/the-prive-2.jpg",
      "assets/img/media/the-prive-3.jpg"
    ],
    "short": "Tổ hợp căn hộ hạng sang 6,7 ha của Bluemarq Group (Đất Xanh cũ) tại Nam Rạch Chiếc — 12 tháp, 3.175 căn, ba mặt giáp sông Giồng Ông Tố, thiết kế chuẩn resort.",
    "description": [
      "The Privé là dự án căn hộ hạng sang quy mô 6,7 ha do Bluemarq Group (tiền thân Tập đoàn Đất Xanh) phát triển tại khu Nam Rạch Chiếc, phường An Phú (cũ), TP. Thủ Đức — cạnh đường Song Hành cao tốc, ba mặt giáp sông Giồng Ông Tố. Dự án gồm 12 tháp cao 33–35 tầng với 3.175 căn hộ 1–3 phòng ngủ, duplex và penthouse, diện tích phổ biến 49,8–98,5 m², mật độ xây dựng chỉ 25%.",
      "Đơn giá tham khảo từ khoảng 133 triệu/m² (chưa VAT, tính theo tim tường — 07/2026). Hệ tiện ích nội khu dày đặc theo phong cách resort: 3 hồ bơi, phòng gym & boxing, golf 3D, sân tennis và pickleball, rạp phim mini, khu co-working, trường mầm non và trạm sạc xe điện. Tiến độ thực tế tháng 8/2026: tháp 8 đã lên tầng 27, các tháp 5–7 hoàn thành sàn tầng 20.",
      "Với vị trí giữa tam giác Thủ Thiêm – An Phú – The Global City và nguồn cung căn hộ hạng sang khan hiếm tại Khu Đông, The Privé thuộc nhóm dự án được PaceLand theo sát giỏ hàng từng đợt mở bán — khách trong mạng lưới được ưu tiên căn tầng đẹp, view sông."
    ],
    "amenities": [
      "3 hồ bơi resort",
      "Đường dạo ven sông Giồng Ông Tố",
      "Gym, boxing & golf 3D",
      "Sân tennis & pickleball",
      "Rạp phim mini & co-working",
      "Trường mầm non nội khu",
      "Trạm sạc xe điện",
      "Mật độ xây dựng 25%"
    ]
  },
  {
    "id": "eaton-park",
    "name": "Eaton Park",
    "developer": "Gamuda Land",
    "location": "63 Mai Chí Thọ, P. Bình Trưng (An Phú cũ), TP. Thủ Đức",
    "area": "Khu Đông",
    "segment": "Hạng sang",
    "type": "Căn hộ",
    "status": "Đang mở bán",
    "offmarket": false,
    "badge": "Bàn giao từ 2026",
    "priceText": "Từ 9,5 tỉ",
    "priceValue": 9.5,
    "beds": "1–3 PN & Penthouse",
    "size": "51,9 – 104,8 m²",
    "handover": "Từ Q2/2026",
    "cover": "assets/img/media/eaton-park-1.jpg",
    "gallery": [
      "assets/img/media/eaton-park-1.jpg",
      "assets/img/media/eaton-park-2.jpg",
      "assets/img/media/eaton-park-3.jpg"
    ],
    "short": "Tổ hợp căn hộ hạng sang 3,76 ha của Gamuda Land (Malaysia) ngay mặt tiền Mai Chí Thọ — 6 tháp, 1.980 căn hộ, bàn giao từ Quý 2/2026.",
    "description": [
      "Eaton Park do Gamuda Land — nhà phát triển Malaysia hoạt động tại Việt Nam từ 2007 — xây dựng trên khu đất 3,76 ha mặt tiền đại lộ Mai Chí Thọ, phường An Phú (cũ), TP. Thủ Đức. Quy mô 6 tháp cao 29–39 tầng gồm 1.980 căn hộ cùng 72 shophouse; kết nối thẳng về Thủ Thiêm, Quận 1 và cao tốc đi sân bay Long Thành.",
      "Cơ cấu căn: 1PN (51,9–55,8 m²), 2PN (71,7–79,5 m²), 3PN (103,7–104,8 m²) và penthouse. Giá tham khảo giai đoạn 3 (07/2026): 1PN từ 9,5–10,5 tỉ; 2PN 13,5–15 tỉ; 3PN 20,5–21,5 tỉ. Bàn giao dự kiến từ Quý 2/2026 — thuộc nhóm dự án hạng sang hiếm hoi tại Khu Đông nhận nhà ngay trong năm. Toàn bộ 6 tháp đã cất nóc ngày 12/8/2026.",
      "Hai phân khu với 6 tháp đặt tên theo cảnh quan (Alpine, Forest, Cove, Lagoon, Grove, Strait). Tệp khách thuê chuyên gia quanh trục Mai Chí Thọ giúp Eaton Park vừa phù hợp ở thực vừa cho dòng tiền cho thuê ổn định — PaceLand tư vấn chọn tháp, tầng và layout theo mục tiêu của từng khách hàng."
    ],
    "amenities": [
      "Hồ bơi resort & gym, yoga",
      "Sân golf 3D",
      "Sân thể thao đa năng (Pickleball, Basketball)",
      "Công viên thú cưng",
      "Công viên ven sông & khu BBQ",
      "Phố thương mại khối đế",
      "Sân chơi trẻ em"
    ],
    "zones": [
      { "name": "Phân khu 1", "type": "Tháp A1 Alpine · A2 Forest · A3 Cove · A4 Lagoon", "status": "Đang bàn giao" },
      { "name": "Phân khu 2", "type": "Tháp A5 Grove · A6 Strait", "status": "Đang mở bán" }
    ]
  },
  {
    "id": "the-global-city",
    "name": "The Global City",
    "developer": "Masterise Homes (CĐT: SDI Corp)",
    "location": "Đỗ Xuân Hợp, P. An Phú (cũ), TP. Thủ Đức",
    "area": "Khu Đông",
    "segment": "Hạng sang",
    "type": "Căn hộ",
    "status": "Đang mở bán",
    "offmarket": false,
    "badge": "Khu đô thị 117,4 ha",
    "priceText": "Căn hộ từ 6,7 tỉ (tham khảo 09/2026)",
    "priceValue": 6.7,
    "beds": "Căn hộ · Nhà phố · Biệt thự",
    "size": "6 phân khu chính",
    "handover": "Theo phân khu",
    "cover": "assets/img/media/the-global-city-1.jpg",
    "gallery": [
      "assets/img/media/the-global-city-1.jpg",
      "assets/img/media/the-global-city-2.jpg",
      "assets/img/media/the-global-city-3.jpg"
    ],
    "short": "Khu đô thị 117,4 ha do Masterise Homes phát triển tại Đỗ Xuân Hợp, TP. Thủ Đức — trung tâm mới của TP.HCM với 6 phân khu từ nhà phố SOHO đến các tháp căn hộ Masteri, LUMIÈRE.",
    "description": [
      "The Global City là khu đô thị quy mô 117,4 ha tại đường Đỗ Xuân Hợp, phường An Phú (cũ), TP. Thủ Đức, do Masterise Homes phát triển (chủ đầu tư: SDI Corp). Dự án được quy hoạch làm \"downtown mới\" của TP.HCM với đầy đủ căn hộ cao tầng, nhà phố, biệt thự, tòa văn phòng hạng A, trung tâm mua sắm và khu nhạc nước ngoài trời thuộc nhóm lớn nhất Đông Nam Á.",
      "Sáu phân khu chính: nhà phố thương mại SOHO (đã vận hành, hình thành phố kinh doanh sầm uất), khu thấp tầng SOLA, cùng bốn dòng căn hộ cao tầng — Masteri Grand View (đang mở bán), LUMIÈRE Midtown, Masteri Park Place và Masteri Cosmo Central (các giai đoạn kế tiếp). Mỗi phân khu có chính sách giá và tiến độ riêng.",
      "Với vị trí giữa An Phú – Rạch Chiếc và mặt bằng giá tăng theo từng giai đoạn mở bán, The Global City là danh mục PaceLand theo dõi liên tục: khách trong mạng lưới được cập nhật giỏ hàng sơ cấp lẫn quỹ căn chuyển nhượng chọn lọc theo từng phân khu."
    ],
    "amenities": [
      "Khu nhạc nước ngoài trời quy mô hàng đầu ĐNÁ",
      "Trung tâm mua sắm quy mô lớn",
      "Tòa văn phòng hạng A",
      "Quảng trường & hồ cảnh quan",
      "Công viên ven kênh",
      "Hạ tầng đồng bộ toàn khu"
    ],
    "zones": [
      { "name": "SOHO", "type": "Nhà phố thương mại", "status": "Đã vận hành", "note": "Dãy phố kinh doanh đầu tiên của khu đô thị" },
      { "name": "SOLA", "type": "Khu thấp tầng", "status": "Đang triển khai" },
      { "name": "Masteri Grand View", "type": "Căn hộ cao tầng", "status": "Đang mở bán", "note": "Phân khu cao tầng đầu tiên, trục trung tâm" },
      { "name": "LUMIÈRE Midtown", "type": "Căn hộ cao tầng", "status": "Đang triển khai" },
      { "name": "Masteri Park Place", "type": "Căn hộ cao tầng", "status": "Giai đoạn kế tiếp" },
      { "name": "Masteri Cosmo Central", "type": "Căn hộ cao tầng", "status": "Sắp ra mắt" }
    ]
  },
  {
    "id": "gladia-heights",
    "name": "Gladia Heights",
    "developer": "Khang Điền & Keppel Land",
    "location": "Võ Chí Công, P. Bình Trưng Đông (cũ), TP. Thủ Đức",
    "area": "Khu Đông",
    "segment": "Cao cấp",
    "type": "Căn hộ",
    "status": "Đang mở bán",
    "offmarket": false,
    "badge": "Ba mặt sông Rạch Chiếc",
    "priceText": "Từ 4,4 tỉ (tham khảo 09/2026)",
    "priceValue": 4.4,
    "beds": "1–4 PN",
    "size": "50,3 – 144,2 m²",
    "handover": "Dự kiến quý IV/2027",
    "cover": "assets/img/media/gladia-heights-1.jpg",
    "gallery": [
      "assets/img/media/gladia-heights-1.jpg",
      "assets/img/media/gladia-heights-2.jpg",
      "assets/img/media/gladia-heights-3.jpg"
    ],
    "short": "Dự án căn hộ hợp tác Khang Điền × Keppel Land tại Võ Chí Công, TP. Thủ Đức — 3 tháp 15 tầng, 616 căn hộ, ba mặt giáp sông Rạch Chiếc, bàn giao dự kiến quý IV/2027.",
    "description": [
      "Gladia Heights là dự án căn hộ cao cấp do liên danh Khang Điền (Việt Nam) và Keppel Land (Singapore) phát triển tại đường Võ Chí Công, phường Bình Trưng Đông (cũ), TP. Thủ Đức — kế cận Thủ Thiêm, ba mặt giáp sông Rạch Chiếc. Giai đoạn 1 quy mô 1,26 ha nằm trong cụm đô thị tích hợp khoảng 60 ha của hai chủ đầu tư.",
      "Dự án gồm 3 tháp cao 15 tầng — mật độ thấp hiếm có ở phân khúc này — với 616 căn hộ và 23 căn thương mại dịch vụ. Cơ cấu căn: 1PN 50,3–53,5 m², 2PN 71,4–85,1 m², 3PN 115–124,7 m², 4PN ~144,2 m². Dự án chính thức mở bán ngày 1/8/2026; bàn giao dự kiến quý IV/2027, cấp giấy chứng nhận dự kiến 2028.",
      "Uy tín pháp lý của Khang Điền cộng chuẩn phát triển Singapore của Keppel Land là lý do Gladia Heights nằm trong nhóm dự án PaceLand khuyến nghị theo dõi sớm — bảng giá công bố theo từng đợt, khách trong mạng lưới được ưu tiên giữ chỗ căn tầng đẹp."
    ],
    "amenities": [
      "Ba mặt giáp sông Rạch Chiếc",
      "Mật độ thấp — 3 tháp 15 tầng",
      "Hồ bơi & khu thể thao",
      "Công viên nội khu",
      "Shophouse khối đế",
      "Kế cận Thủ Thiêm & Võ Chí Công"
    ]
  },
  {
    "id": "one-central-saigon",
    "name": "One Central Saigon",
    "developer": "Masterise Homes (CĐT: Công ty TNHH Saigon Glory)",
    "location": "Tứ giác Bến Thành, P. Bến Thành (Nguyễn Thái Bình, Q.1 cũ), TP.HCM",
    "area": "Trung tâm",
    "segment": "Siêu sang",
    "type": "Căn hộ",
    "status": "Giao dịch kín",
    "offmarket": true,
    "badge": "214 căn Ritz-Carlton Residences",
    "priceText": "Liên hệ",
    "priceValue": 0,
    "beds": "Đang cập nhật",
    "size": "Đang cập nhật",
    "handover": "Đang cập nhật",
    "cover": "assets/img/media/one-central-saigon-1.jpg",
    "gallery": [
      "assets/img/media/one-central-saigon-1.jpg",
      "assets/img/media/one-central-saigon-2.jpg",
      "assets/img/media/one-central-saigon-3.jpg"
    ],
    "short": "Tháp đôi 55 và 48 tầng đối diện chợ Bến Thành do Masterise Homes phát triển — khách sạn Ritz-Carlton đầu tiên tại Việt Nam và 214 căn hộ hàng hiệu The Ritz-Carlton Residences, Saigon.",
    "description": [
      "One Central Saigon là tổ hợp tháp đôi trên khu đất 8.537 m² có 4 mặt tiền Phạm Ngũ Lão – Calmette – Lê Thị Hồng Gấm – Phó Đức Chính, đối diện chợ Bến Thành, phường Bến Thành (Nguyễn Thái Bình, Quận 1 cũ). Chủ đầu tư là Công ty TNHH Saigon Glory; Masterise Homes phát triển và chính thức ra mắt dự án ngày 13/5/2026.",
      "Hai tháp 55 và 48 tầng đứng trên khối đế 7 tầng nổi, 6 tầng hầm. Tháp Tây gồm văn phòng hạng A+ và khách sạn; tổ hợp có The Ritz-Carlton, Saigon 231 phòng — khách sạn Ritz-Carlton đầu tiên tại Việt Nam. Tháp Đông là 214 căn hộ The Ritz-Carlton Residences, Saigon; khối đế có 19.990 m² thương mại và tầng hầm nối thẳng ga metro Bến Thành.",
      "Theo danh sách Sở Xây dựng TP.HCM công bố tháng 7/2026, 214 căn hộ đủ điều kiện bán nhà ở hình thành trong tương lai, Techcombank bảo lãnh. Công trình tái khởi công giữa tháng 3/2026, tổng thầu Newtecons dự kiến hoàn thành sau khoảng 30 tháng; giá bán, cơ cấu căn và ngày bàn giao chưa được công bố chính thức — PaceLand cập nhật ngay khi có văn bản của chủ đầu tư."
    ],
    "amenities": [
      "Căn hộ hàng hiệu The Ritz-Carlton Residences",
      "Khách sạn The Ritz-Carlton, Saigon 231 phòng",
      "Trung tâm thương mại cao cấp 19.990 m²",
      "Văn phòng hạng A+",
      "Tầng hầm nối ga metro Bến Thành",
      "Đối diện chợ Bến Thành"
    ],
    "zones": [
      {
        "name": "Tháp Đông (tháp B)",
        "type": "48 tầng · 214 căn hộ The Ritz-Carlton Residences, Saigon",
        "status": "Đang thi công",
        "note": "Có tên trong danh sách đủ điều kiện bán Sở Xây dựng công bố tháng 7/2026, Techcombank bảo lãnh; tổng thầu ghi 47 tầng"
      },
      {
        "name": "Tháp Tây (tháp A)",
        "type": "55 tầng · văn phòng hạng A+ và khách sạn",
        "status": "Đang thi công",
        "note": "Tổng thầu Newtecons ghi 56 tầng"
      },
      {
        "name": "Khối đế",
        "type": "Trung tâm thương mại 19.990 m² · 7 tầng nổi, 6 tầng hầm",
        "status": "Đang thi công",
        "note": "6 tầng hầm nghiệm thu năm 2018; hầm B1 nối ga metro Bến Thành"
      }
    ]
  },
  {
    "id": "vinhomes-grand-park",
    "name": "Vinhomes Grand Park",
    "developer": "Vinhomes",
    "location": "Phường Long Bình, TP.HCM (Long Bình – Long Thạnh Mỹ, TP Thủ Đức cũ)",
    "area": "Khu Đông",
    "segment": "Cao cấp",
    "type": "Căn hộ",
    "status": "Đang mở bán",
    "offmarket": false,
    "badge": "271 ha · hơn 70.000 cư dân",
    "priceText": "Từ 2,1 tỉ (tham khảo 12/2025)",
    "priceValue": 2.1,
    "beds": "Studio – 3PN",
    "size": "27 – 108 m²",
    "handover": "Phần lớn đã bàn giao; The Opus One theo kế hoạch từ 3/2026",
    "cover": "assets/img/media/vinhomes-grand-park-1.jpg",
    "gallery": [
      "assets/img/media/vinhomes-grand-park-1.jpg",
      "assets/img/media/vinhomes-grand-park-2.jpg",
      "assets/img/media/vinhomes-grand-park-3.jpg"
    ],
    "short": "Đại đô thị 271 ha của Vinhomes ở phường Long Bình, bao bởi sông Đồng Nai và sông Tắc, có đại công viên 36 ha và hơn 70.000 cư dân; Vành đai 3 trên cao chạy xuyên khu, dự kiến thông xe 30/9/2026.",
    "description": [
      "Vinhomes Grand Park là đại đô thị 271 ha của Vinhomes ở phường Long Bình, TP.HCM — trước ngày 1/7/2025 thuộc hai phường Long Bình và Long Thạnh Mỹ, TP Thủ Đức. Khu đất có hai mặt tiền đường Nguyễn Xiển và Phước Thiện, hai mặt còn lại giáp sông Đồng Nai và sông Tắc; đơn vị đứng tên chủ đầu tư là Công ty CP Phát triển Thành phố Xanh, công ty con của Vinhomes. Mở bán từ giữa năm 2019, đến năm 2026 khu đô thị có hơn 70.000 cư dân theo chủ đầu tư.",
      "Phần cao tầng gồm The Rainbow, The Origami (dòng Sapphire), The Beverly, The Beverly Solari, Glory Heights và The Opus One — phân khu cao tầng cuối cùng, do Vinhomes hợp tác Samty (Nhật Bản), cất nóc ngày 31/7/2025. Mitsubishi Corporation và Nomura Real Estate cùng phát triển The Origami, The Beverly Solari, Glory Heights; Masterise Homes làm Masteri Centre Point và Lumière Boulevard. Khu thấp tầng The Manhattan – The Manhattan Glory có biệt thự, shop villa và shophouse quanh đại công viên.",
      "Tiện ích đang vận hành gồm đại công viên 36 ha, công viên giải trí Grand Park (từ 12/2024), Vincom Mega Mall Grand Park (từ 6/2024), phòng khám Vinmec (từ 7/2025), 2 trường Vinschool và VinBus. Hơn 11.000 sổ hồng đã trao đến cuối năm 2024. Tháng 9/2026, Vinhomes vẫn chào bán The Opus One, The Beverly và biệt thự Manhattan Glory; đoạn Vành đai 3 trên cao hơn 3 km xuyên khu đô thị dự kiến thông xe ngày 30/9/2026."
    ],
    "amenities": [
      "Đại công viên 36 ha",
      "Công viên giải trí Grand Park",
      "Vincom Mega Mall Grand Park 50.000 m²",
      "Phòng khám Vinmec Grand Park",
      "Vinschool Grand Park (2 cơ sở)",
      "VinBus nội khu và tuyến D4",
      "Sân tập golf 2 tầng 36 ô"
    ],
    "zones": [
      {
        "name": "The Rainbow",
        "type": "Căn hộ (dòng Sapphire)",
        "status": "Đã bàn giao",
        "note": "17 tòa ở các cụm S1, S2, S3, S5, hơn 10.300 căn; phân khu mở bán đầu tiên (2019), duy nhất giáp đường Nguyễn Xiển; sổ hồng trao từ 3/2023"
      },
      {
        "name": "The Origami",
        "type": "Căn hộ (dòng Sapphire)",
        "status": "Đã bàn giao",
        "note": "21 tòa, cụm S6–S10, khoảng 26 ha, 10.926 căn theo Nomura Real Estate; ra mắt 7/2020, hoàn thành 2022; Vinhomes hợp tác Mitsubishi Corporation và Nomura"
      },
      {
        "name": "The Manhattan",
        "type": "Biệt thự, shop villa, shophouse",
        "status": "Đã bàn giao",
        "note": "Ra mắt 2/6/2020, khoảng 550 sản phẩm bao quanh đại công viên 36 ha; bàn giao từ giữa năm 2021"
      },
      {
        "name": "The Manhattan Glory",
        "type": "Biệt thự, liền kề, shophouse",
        "status": "Đang chào bán quỹ căn còn lại (9/2026)",
        "note": "Tiểu khu mở rộng 48 ha công bố 30/6/2020; 23 biệt thự ven sông bản giới hạn ra mắt 3/11/2020, kèm quyền ưu tiên chỗ đậu du thuyền"
      },
      {
        "name": "The Beverly",
        "type": "Căn hộ (tiêu chuẩn Ruby, Diamond)",
        "status": "Đã bàn giao; còn giỏ hàng chủ đầu tư (9/2026)",
        "note": "10 tòa 32 tầng, 2 hầm, chia khu The Resort (6 tòa) và The Star (4 tòa); ra mắt 11/2021, đối diện đại công viên 36 ha"
      },
      {
        "name": "The Beverly Solari",
        "type": "Căn hộ, shophouse khối đế",
        "status": "Đang bàn giao",
        "note": "Vinhomes và Mitsubishi Corporation ra mắt 4/2022; tiểu khu The Oasis, The Tropical; pháp nhân Công ty TNHH Kinh doanh BĐS MV1 Việt Nam"
      },
      {
        "name": "Glory Heights",
        "type": "Căn hộ",
        "status": "Đã hoàn thành",
        "note": "5 tòa 24–39 tầng trên đại lộ Rodeo, đối diện Vincom Mega Mall; mở bán 7/2023; cùng giai đoạn 3 với The Beverly Solari (Nomura Real Estate tham gia)"
      },
      {
        "name": "The Opus One",
        "type": "Căn hộ cao cấp",
        "status": "Đang bán; bàn giao theo kế hoạch từ 3/2026",
        "note": "Vinhomes và Samty (Nhật Bản); 4 tòa OS1, OS2, OS3, OS5 cao 32–34 tầng trên hơn 2,3 ha, 1.952 căn; ra mắt 11/2024, cất nóc 31/7/2025"
      },
      {
        "name": "Masteri Centre Point",
        "type": "Căn hộ (compound)",
        "status": "Đã bàn giao",
        "note": "Masterise Homes phát triển; hơn 7 ha, 10 tòa 22–39 tầng, hai khu Riviera và Gardenia; sổ hồng trao từ 16/5/2025"
      },
      {
        "name": "Lumière Boulevard",
        "type": "Căn hộ (compound)",
        "status": "Đã bàn giao",
        "note": "Masterise Homes phát triển; hoàn thiện và đón cư dân từ đầu năm 2024; 24 vườn treo trên mặt dựng; số 8 đường D1"
      }
    ]
  },
  {
    "id": "eco-retreat",
    "name": "Eco Retreat",
    "developer": "Liên danh DB – Tập đoàn Ecopark",
    "location": "Xã Bến Lức (xã Thanh Phú, huyện Bến Lức, Long An cũ), Tây Ninh",
    "area": "Vùng ven & nghỉ dưỡng",
    "segment": "Cao cấp",
    "type": "Biệt thự",
    "status": "Đang mở bán",
    "offmarket": false,
    "badge": "8 km đường tắm rừng",
    "priceText": "Nhà phố từ 120 tr/m² (tham khảo 08/2025)",
    "priceValue": 0,
    "beds": "Nhà phố · Biệt thự · Căn hộ studio–3 PN",
    "size": "219,5 ha · 7.427 căn",
    "handover": "Dự kiến từ quý III/2026",
    "cover": "assets/img/media/eco-retreat-1.jpg",
    "gallery": [
      "assets/img/media/eco-retreat-1.jpg",
      "assets/img/media/eco-retreat-2.jpg",
      "assets/img/media/eco-retreat-3.jpg"
    ],
    "short": "Đô thị 'rừng trị liệu' 219,5 ha của nhà sáng lập Ecopark ở xã Bến Lức, Tây Ninh (Long An cũ): nhà phố, biệt thự, căn hộ quanh hồ Thiên Nga, chủ đầu tư công bố khoảng 30 phút tới bến Bạch Đằng.",
    "description": [
      "Eco Retreat là đô thị 219,5 ha do DB Group – nhà sáng lập Ecopark – phát triển tại xã Bến Lức, tỉnh Tây Ninh (xã Thanh Phú, huyện Bến Lức, tỉnh Long An cũ). Tên pháp lý là Khu đô thị sinh thái, thương mại du lịch tại xã Thanh Phú; chủ đầu tư là liên danh Công ty TNHH MTV Đầu tư và Phát triển DB – Công ty CP Tập đoàn Ecopark, tổng vốn khoảng 16.981 tỉ đồng. Quy hoạch 1/500 (Quyết định 148/QĐ-UBND ngày 8/1/2024) có 7.427 căn nhà: 1.742 lô liền kề, 2.185 lô biệt thự và 3.500 căn hộ.",
      "Dự án ra mắt tháng 2/2025, khởi công ngày 19/4/2025 và chia thành nhiều phân khu: nhà thấp tầng Mùa Xuân – Mùa Hạ – Mùa Thu, tháp đôi Sky Retreat 41 tầng, biệt thự đảo Retreat Island 35 ha, biệt thự rừng Retreat Forest 56,2 ha và phân khu cửa ngõ Mùa Lễ Hội 71,5 ha (Rừng Mai, Forest Onsen, Rừng Phượng). Chủ đầu tư dành khoảng 55 % diện tích cho cảnh quan, với vòng Retreat Circle 50 ha và đường tắm rừng 8 km ven mặt nước.",
      "Nhà thấp tầng đầu tiên ở phân khu Mùa Hạ được lên kế hoạch bàn giao từ giữa năm 2026; các bài báo tháng 7/2026 ghi dự kiến từ quý III/2026. Dự án nằm trên trục ĐT.830C, cách nút giao Mỹ Yên khoảng 4 km. Theo VnExpress (8/2025), căn hộ Sky Retreat được chào 55–60 triệu/m², nhà phố liền kề từ 120 triệu/m²."
    ],
    "amenities": [
      "Công viên Hồ Thiên Nga",
      "Đường tắm rừng 8 km ven mặt nước",
      "Retreat Circle 50 ha, 20 vườn chủ đề",
      "Phố thương mại Eco Bazaar",
      "Trường liên cấp Edison 22.000 m²",
      "Clubhouse riêng từng phân khu",
      "Onsen Clubhouse 1.800 m² (Forest Onsen)"
    ],
    "zones": [
      {
        "name": "Mùa Xuân · Mùa Hạ · Mùa Thu (Home Retreat)",
        "type": "Nhà phố · town villa · biệt thự",
        "status": "Mùa Hạ: bàn giao đợt đầu theo kế hoạch từ giữa năm 2026",
        "note": "Ra mắt tháng 4/2025; Mùa Xuân có đại lộ 30 m, trường học 9.100 m² và Retreat Center 3.100 m² theo quy hoạch"
      },
      {
        "name": "Sky Retreat",
        "type": "Căn hộ · thấp tầng khối đế",
        "status": "Ra mắt tháng 5/2025",
        "note": "2 tháp 41 tầng (S1, S2), 1.170 căn hộ và 221 căn thấp tầng; Sky Clubhouse 2.500 m²"
      },
      {
        "name": "Retreat Island",
        "type": "Biệt thự đảo",
        "status": "Ra mắt tháng 7/2025",
        "note": "35 ha, 15 nhánh đảo, 483 biệt thự và dinh thự 190–697 m²"
      },
      {
        "name": "Retreat Forest",
        "type": "Biệt thự",
        "status": "Ra mắt 29/10/2025; biệt thự mẫu đã mở cửa",
        "note": "56,2 ha, 604 căn: 103 villa đại lộ và 501 villa rừng có tầng hầm"
      },
      {
        "name": "Mùa Lễ Hội – Rừng Mai",
        "type": "Nhà phố · shophouse · biệt thự",
        "status": "Ra mắt 15/1/2026",
        "note": "Phân khu cửa ngõ 71,5 ha; Rừng Mai 285 căn, park villa 162–180 m², Zen Clubhouse 2.600 m²"
      },
      {
        "name": "Mùa Lễ Hội – Forest Onsen",
        "type": "Căn hộ",
        "status": "Ra mắt tháng 4/2026",
        "note": "2 cặp tháp đôi trên 2,2 ha, căn 38–200 m², tầng tiện ích 5A rộng 5.000 m²"
      },
      {
        "name": "Mùa Lễ Hội – Rừng Phượng",
        "type": "Nhà phố · biệt thự",
        "status": "Ra mắt tháng 7/2026",
        "note": "325 sản phẩm 80–370 m² quanh trường Edison 22.000 m²"
      }
    ]
  },
  {
    "id": "metropole-thu-thiem",
    "name": "The Metropole Thủ Thiêm",
    "developer": "SonKim Land (chủ đầu tư: CTCP Quốc Lộc Phát)",
    "location": "KĐT mới Thủ Thiêm, phường An Khánh (TP Thủ Đức cũ), TP.HCM",
    "area": "Khu Đông",
    "segment": "Hạng sang",
    "type": "Căn hộ",
    "status": "Giao dịch kín",
    "offmarket": true,
    "badge": "3 phân khu đã bàn giao",
    "priceText": "330–500 tr/m² chuyển nhượng (tham khảo 05/2026)",
    "priceValue": 0,
    "beds": "Studio – 4 PN, duplex, Sky Villa",
    "size": "47,44 – 380 m²",
    "handover": "Đã bàn giao 3 phân khu; The OpusK dự kiến quý II/2027",
    "cover": "assets/img/media/metropole-1.jpg",
    "gallery": [
      "assets/img/media/metropole-1.jpg",
      "assets/img/media/metropole-2.jpg",
      "assets/img/media/metropole-3.jpg"
    ],
    "short": "Khu phức hợp 7,6 ha sát cầu Ba Son do SonKim Land phát triển: 3 phân khu căn hộ đã bàn giao, phân khu cuối The OpusK (150 căn) dự kiến xong quý II/2027.",
    "description": [
      "The Metropole Thủ Thiêm (tên pháp lý Khu phức hợp Sóng Việt) là khu phức hợp căn hộ – văn phòng – thương mại rộng khoảng 7,6 ha trong khu chức năng số 1 của khu đô thị mới Thủ Thiêm, nay thuộc phường An Khánh, TP.HCM. Chủ đầu tư là Công ty CP Quốc Lộc Phát, SonKim Land làm nhà phát triển từ giữa năm 2018; dự án nằm sát chân cầu Ba Son, nhìn sang Quận 1 cũ.",
      "Dự án có 4 phân khu nhà ở với 1.492 căn theo số chủ đầu tư công bố. The Galleria (456 căn) bàn giao từ tháng 7/2021, The Crest (240 căn) đã bàn giao, cư dân hai phân khu này đã nhận sổ hồng; The Opera (646 căn, 2 tháp Scala – Massimo) bàn giao từ tháng 3/2024. Phân khu cuối The OpusK — tháp phức hợp 36 tầng với 150 căn hạng sang cạnh tháp văn phòng 30 tầng — khởi công ngày 2/6/2025, dự kiến hoàn thành quý II/2027.",
      "Theo VnExpress (29/5/2026), căn chuyển nhượng ở ba phân khu đã bàn giao giao dịch khoảng 330–500 triệu/m², The OpusK được chào khoảng 250–450 triệu/m². PaceLand tư vấn cả căn chuyển nhượng lẫn căn OpusK, kiểm tra sổ hồng, tình trạng thế chấp và văn bản pháp lý của đúng căn trước khi anh/chị đặt cọc."
    ],
    "amenities": [
      "Hồ bơi vô cực",
      "Jacuzzi & sauna ngoài trời",
      "Phòng gym",
      "Phòng golf mô phỏng",
      "Phòng yoga",
      "Công viên nước thiếu nhi (The Galleria)",
      "Khối đế thương mại"
    ],
    "zones": [
      {
        "name": "The Galleria Residence",
        "type": "Căn hộ, duplex, loft, penthouse, shophouse",
        "status": "Đã bàn giao từ 7/2021",
        "note": "Lô 1-16; 3 tháp Hermitage, Prado, Louvre cao 12 tầng; 456 căn hộ và 30 căn văn phòng – thương mại; cư dân đã có sổ hồng"
      },
      {
        "name": "The Crest Residence",
        "type": "Căn hộ studio – 3 PN",
        "status": "Đã bàn giao",
        "note": "Lô 1-13; 240 căn, 47,44–151 m²; chung lô với 2 tòa văn phòng; cư dân đã có sổ hồng"
      },
      {
        "name": "The Opera Residence",
        "type": "Căn hộ 1–4 PN, Sky Villa",
        "status": "Bàn giao từ 3/2024",
        "note": "Lô 1-17; 2 tháp Scala, Massimo; 646 căn, 55–380 m²; tổng thầu Hòa Bình"
      },
      {
        "name": "The OpusK",
        "type": "Căn hộ hạng sang và văn phòng hạng A",
        "status": "Đang xây, dự kiến hoàn thành quý II/2027",
        "note": "Lô 1-14; tháp phức hợp 36 tầng (150 căn) và tháp văn phòng 30 tầng; khởi công 2/6/2025, tổng thầu Coteccons; chào khoảng 250–450 tr/m² (tham khảo 05/2026)"
      },
      {
        "name": "The Hallmark",
        "type": "Văn phòng hạng A+ cho thuê",
        "status": "Đã hoàn thành",
        "note": "Cửa ngõ khu phức hợp, mặt tiền Trần Bạch Đằng; 30 tầng nổi, chứng nhận BCA Green Mark (Gold); chủ đầu tư CTCP Gateway Thủ Thiêm, SonKim Land phát triển, Savills quản lý vận hành"
      }
    ]
  },
  {
    "id": "palm-city",
    "name": "Palm City",
    "developer": "Cty Nam Rạch Chiếc (Tiến Phước – Trần Thái – Gateway)",
    "location": "Song Hành cao tốc, Nam Rạch Chiếc, TP. Thủ Đức",
    "area": "Khu Đông",
    "segment": "Hạng sang",
    "type": "Căn hộ",
    "status": "Đang mở bán",
    "offmarket": false,
    "badge": "2,7 km ven sông",
    "priceText": "GĐ mới: sắp công bố",
    "priceValue": 12,
    "beds": "Căn hộ & thấp tầng",
    "size": "30,2 ha · 4 phân khu",
    "handover": "Palm River: quý I/2029",
    "cover": "assets/img/media/palm-river-1.jpg",
    "gallery": [
      "assets/img/media/palm-river-1.jpg",
      "assets/img/media/palm-river-2.jpg"
    ],
    "short": "Khu đô thị ven sông 30,2 ha tại Nam Rạch Chiếc với 2,7 km bờ sông, trường và bệnh viện quốc tế Mỹ nội khu — giai đoạn mới Palm River (căn hộ hạng sang) đã khởi công tháng 6/2026.",
    "description": [
      "Palm City là khu đô thị 30,2 ha do Công ty TNHH Nam Rạch Chiếc (liên doanh Tiến Phước – Trần Thái – Gateway Thủ Thiêm) phát triển bên đường Song Hành cao tốc, TP. Thủ Đức. Điểm hiếm có: 2,7 km đường ven sông Giồng Ông Tố – Mương Kinh, mật độ xây dựng toàn khu 33%, cùng Trường Quốc tế Mỹ (TAS) và Bệnh viện Quốc tế Mỹ (AIH) ngay trong nội khu.",
      "Các giai đoạn đã hình thành và có sổ hồng: Palm Residence (135 nhà phố – biệt thự), Palm Heights (3 tháp, 816 căn hộ) và Palm Garden. Cộng đồng cư dân hiện hữu đông đúc giúp Palm City là một trong những khu compound vận hành ổn định nhất Khu Đông.",
      "Giai đoạn mới — Palm River — là quỹ đất cao tầng ven sông đẹp nhất còn lại của khu đô thị, định vị căn hộ hạng sang với tiêu chuẩn bàn giao nâng cấp — đã khởi công ngày 16/6/2026, dự kiến bàn giao quý I/2029. Pháp lý sở hữu lâu dài với người Việt. PaceLand là đơn vị tư vấn giỏ hàng Palm River — xem chi tiết tại trang riêng của phân khu."
    ],
    "amenities": [
      "2,7 km đường dạo ven sông",
      "Trường Quốc tế Mỹ (TAS) nội khu",
      "Bệnh viện Quốc tế Mỹ (AIH) nội khu",
      "Hồ bơi resort 50 m & 25 m",
      "Clubhouse, tennis, gym & yoga",
      "Khu BBQ & sân chơi trẻ em",
      "Mật độ xây dựng 33%"
    ],
    "zones": [
      { "name": "Palm Residence", "type": "Nhà phố & biệt thự — 135 căn", "status": "Đã bàn giao, có sổ hồng" },
      { "name": "Palm Heights", "type": "Căn hộ — 3 tháp, 816 căn", "status": "Đã bàn giao, có sổ hồng" },
      { "name": "Palm Garden", "type": "Căn hộ — hồ bơi tràn bờ 25 m", "status": "Đã bàn giao" },
      { "name": "Palm River", "type": "Căn hộ hạng sang ven sông — 4 tháp 36 tầng", "status": "Khởi công 16/6/2026", "note": "Hướng Việt Properties phát triển, dự kiến bàn giao quý I/2029 — quỹ đất cao tầng view sông trực diện", "link": "https://palmriver.paceland.vn/" }
    ]
  },
  {
    "id": "imperia-sensa-park",
    "name": "Imperia Sensa Park",
    "developer": "MIK Group",
    "location": "Võ Chí Công, khu Phú Hữu, TP. Thủ Đức",
    "area": "Khu Đông",
    "segment": "Cao cấp",
    "type": "Căn hộ",
    "status": "Sắp ra mắt",
    "offmarket": false,
    "badge": "Khởi công 6/8/2026",
    "priceText": "Từ 88 tr/m²",
    "priceValue": 5,
    "beds": "1–3 PN & thấp tầng",
    "size": "~4,9 ha · 922 căn hộ",
    "handover": "Dự kiến quý IV/2028",
    "cover": "assets/img/media/imperia-sensa-park-1.jpg",
    "gallery": [
      "assets/img/media/imperia-sensa-park-1.jpg"
    ],
    "short": "Dự án mới của MIK Group tại Võ Chí Công, TP. Thủ Đức — 2 tháp 25 tầng với 922 căn hộ và 93 sản phẩm thấp tầng ven sông, đơn giá từ 88 triệu/m² (tham khảo 07/2026).",
    "description": [
      "Imperia Sensa Park là dự án phức hợp của MIK Group trên khu đất 48.736 m² (~4,9 ha) tại đường Võ Chí Công, khu Phú Hữu, TP. Thủ Đức — liền kề cầu Phú Hữu, hai mặt giáp sông Rạch Chiếc và kênh Một Tấn, mật độ xây dựng chỉ 30,5%. Quy mô gồm 2 tháp căn hộ cao 25 tầng (922 căn, 1–3 phòng ngủ) cùng 93 sản phẩm thấp tầng: shophouse 1 trệt 2 lầu và biệt thự ven sông có sân vườn riêng.",
      "Đơn giá tham khảo từ 88 triệu/m² (chưa VAT), chính sách chiết khấu từ chủ đầu tư lên tới 7,5% (07/2026) — mặt bằng giá dễ tiếp cận hơn đáng kể so với các dự án cùng trục Võ Chí Công về phía Thủ Thiêm, phù hợp cả gia đình trẻ lẫn nhà đầu tư dài hạn đón hạ tầng Khu Đông.",
      "Dự án đã khởi công ngày 6/8/2026, dự kiến bàn giao quý IV/2028. Liên hệ PaceLand để nhận giỏ hàng, mặt bằng tầng và chính sách mới nhất theo từng đợt mở bán."
    ],
    "amenities": [
      "Hồ bơi tràn bờ & clubhouse",
      "Công viên trung tâm & ven sông",
      "Gym, yoga & sân thể thao",
      "Đường chạy bộ nội khu",
      "Khu vui chơi trẻ em",
      "Mật độ xây dựng 30,5%"
    ]
  },
  {
    "id": "the-berkley",
    "name": "The Berkley",
    "developer": "SonKim Land",
    "location": "177 Võ Nguyên Giáp, P. An Khánh (Thảo Điền cũ), TP.HCM",
    "area": "Khu Đông",
    "segment": "Hạng sang",
    "type": "Căn hộ",
    "status": "Đang mở bán",
    "offmarket": false,
    "badge": "Bàn giao hoàn thiện",
    "priceText": "≈250 tr/m² (tham khảo 09/2026)",
    "priceValue": 15,
    "beds": "Đang cập nhật",
    "size": "85 căn · 21 tầng",
    "handover": "Đã thi công hoàn thiện",
    "cover": "assets/img/media/the-berkley.jpg",
    "gallery": [
      "assets/img/media/the-berkley.jpg"
    ],
    "short": "Tòa căn hộ hạng sang 21 tầng chỉ 85 căn của SonKim Land tại Thảo Điền — đã thi công hoàn thiện, cách ga An Phú tuyến Metro số 1 vài phút đi bộ, ra mắt 16/3/2026.",
    "description": [
      "The Berkley tọa lạc tại 177 Võ Nguyên Giáp, phường An Khánh (khu Thảo Điền cũ) — tòa tháp 21 tầng với vỏn vẹn 85 căn hộ, con số hiếm thấy ở phân khúc hạng sang vốn thường tính bằng nghìn căn. Dự án do SonKim Land phát triển, ra mắt ngày 16/3/2026 khi phần thi công đã hoàn thiện: khách xem căn thật, không mua trên giấy.",
      "Vị trí nằm gần ga An Phú của tuyến Metro số 1, giữa cộng đồng cư dân quốc tế Thảo Điền với hệ trường quốc tế, nhà hàng và tiện ích ven sông dày đặc bậc nhất TP.HCM. Đơn giá tham khảo quanh 250 triệu/m² (09/2026).",
      "Số căn giới hạn cộng uy tín của SonKim Land — đơn vị đứng sau The Metropole Thủ Thiêm — khiến The Berkley phù hợp khách mua ở ngay hoặc tích sản dài hạn tại Thảo Điền, nơi nguồn cung mới gần như cạn."
    ],
    "amenities": [
      "Bàn giao hoàn thiện — xem căn thật",
      "Gần ga An Phú Metro số 1",
      "Cộng đồng quốc tế Thảo Điền",
      "Chỉ 85 căn, riêng tư cao"
    ]
  },
  {
    "id": "the-megapolis-thu-thiem",
    "name": "The Megapolis Thủ Thiêm",
    "developer": "SonKim Land (đề xuất, hợp tác MTR)",
    "location": "Khu ga Thủ Thiêm, TP. Thủ Đức",
    "area": "Khu Đông",
    "segment": "Hạng sang",
    "type": "Căn hộ",
    "status": "Sắp ra mắt",
    "offmarket": false,
    "badge": "Phức hợp TOD ga Thủ Thiêm",
    "priceText": "Chưa công bố",
    "priceValue": 0,
    "beds": "Đang cập nhật",
    "size": "Khu đất ga 17,2 ha",
    "handover": "Đang cập nhật",
    "cover": "assets/img/media/the-megapolis-thu-thiem.jpg",
    "gallery": [
      "assets/img/media/the-megapolis-thu-thiem.jpg"
    ],
    "short": "Đề xuất khu đô thị phức hợp TOD của SonKim Land quanh ga Thủ Thiêm — điểm gặp của Metro số 2, đường sắt tốc độ cao Bắc – Nam và tuyến Thủ Thiêm – Long Thành; đã ký MOU với MTR ngày 9/9/2026.",
    "description": [
      "The Megapolis Thủ Thiêm là đề xuất phát triển khu đô thị phức hợp theo mô hình TOD (đô thị gắn nhà ga) trên khu đất ga Thủ Thiêm rộng 17,2 ha — nơi hội tụ ba tuyến hạ tầng chiến lược: Metro số 2, đường sắt tốc độ cao Bắc – Nam và tuyến Thủ Thiêm – Long Thành đi sân bay quốc tế mới.",
      "Ngày 9/9/2026, SonKim Land ký biên bản ghi nhớ hợp tác với MTR — nhà phát triển TOD vận hành hệ thống metro Hong Kong — với quy mô đề xuất khoảng 550.000 m² sàn thương mại, văn phòng và khách sạn. Dự án đang ở giai đoạn đề xuất: chưa mở bán, chưa có bảng giá.",
      "PaceLand theo sát tiến trình pháp lý của dự án. Khách quan tâm mô hình TOD đầu tiên tại Thủ Thiêm nên đăng ký sớm để nhận thông tin ngay khi có cấu trúc sản phẩm chính thức."
    ],
    "amenities": [
      "Điểm gặp 3 tuyến đường sắt",
      "MOU SonKim Land × MTR (9/9/2026)",
      "≈550.000 m² TMDV (đề xuất)",
      "Mô hình TOD đầu tiên tại Thủ Thiêm"
    ]
  },
  {
    "id": "senturia-an-phu",
    "name": "Senturia An Phú",
    "developer": "Tiến Phước",
    "location": "Nam Rạch Chiếc, P. Bình Trưng (An Phú cũ), TP. Thủ Đức",
    "area": "Khu Đông",
    "segment": "Cao cấp",
    "type": "Nhà phố thương mại",
    "status": "Đang mở bán",
    "offmarket": false,
    "badge": "Cất nóc 12/2025",
    "priceText": "Liên hệ bảng giá",
    "priceValue": 0,
    "beds": "Nhà phố · shophouse · biệt thự song lập",
    "size": "8,6 ha · 355 căn",
    "handover": "Từ quý IV/2026",
    "cover": "assets/img/media/senturia-an-phu.jpg",
    "gallery": [
      "assets/img/media/senturia-an-phu.jpg"
    ],
    "short": "Khu compound thấp tầng 8,6 ha của Tiến Phước tại Nam Rạch Chiếc — 355 căn nhà phố, shophouse và biệt thự song lập mặt tiền đường Song Hành cao tốc; cất nóc 12/2025, bàn giao từ quý IV/2026.",
    "description": [
      "Senturia An Phú là khu nhà ở thấp tầng quy mô 8,6 ha do Tiến Phước phát triển tại Nam Rạch Chiếc, mặt tiền đường Song Hành cao tốc Long Thành. Dự án gồm 355 căn: 202 nhà phố liên kế, 91 nhà phố thương mại và 62 biệt thự song lập trong compound an ninh khép kín.",
      "Toàn khu đã cất nóc ngày 29/12/2025, dự kiến bàn giao từ quý IV/2026 — khách mua giai đoạn này nhìn được sản phẩm thật và đo đếm chính xác tiến độ. Vị trí nằm giữa tam giác An Phú – The Global City – The Privé, hưởng trọn hạ tầng và tiện ích của cụm dự án Nam Rạch Chiếc.",
      "Nhà phố xây sẵn trong compound tại Khu Đông là dòng sản phẩm khan hiếm; Senturia An Phú thuộc nhóm được khách tích sản hỏi nhiều nhất trong danh mục thấp tầng của PaceLand."
    ],
    "amenities": [
      "Compound an ninh khép kín",
      "Mặt tiền Song Hành cao tốc",
      "Cất nóc 12/2025 — thấy nhà thật",
      "Liền kề The Global City"
    ]
  },
  {
    "id": "blanca-city",
    "name": "Blanca City",
    "developer": "Sun Group",
    "location": "Đường 3 Tháng 2, Bãi Sau (TP. Vũng Tàu cũ), TP.HCM",
    "area": "Vùng ven & nghỉ dưỡng",
    "segment": "Nghỉ dưỡng",
    "type": "Căn hộ",
    "status": "Đang mở bán",
    "offmarket": false,
    "badge": "Đô thị biển Sun Group",
    "priceText": "Liên hệ bảng giá",
    "priceValue": 0,
    "beds": "Căn hộ · nhà phố · biệt thự",
    "size": "96,6 ha",
    "handover": "Đang cập nhật",
    "cover": "assets/img/media/blanca-city.jpg",
    "gallery": [
      "assets/img/media/blanca-city.jpg"
    ],
    "short": "Đô thị biển 96,6 ha của Sun Group tại Bãi Sau Vũng Tàu — các tháp căn hộ Blanca, Beacon, Beachtro và phân khu thấp tầng Casa; công viên nước Sun World 15 ha trong khu đã mở cửa từ 12/2/2026.",
    "description": [
      "Blanca City là khu đô thị biển quy mô 96,6 ha do Sun Group phát triển với hai mặt tiền đường 3 Tháng 2 và trục biển Bãi Sau — vị trí lõi du lịch của Vũng Tàu, nay thuộc TP.HCM sau sáp nhập. Cơ cấu sản phẩm gồm các tháp căn hộ Blanca, Beacon và Beachtro, cùng phân khu thấp tầng Casa với biệt thự Casa Villa, Casa Grand Villa và nhà phố Casa Townhouse.",
      "Dự án khởi công ngày 16/5/2025. Điểm nhấn hiếm có: công viên nước Sun World Vũng Tàu 15 ha nằm ngay trong khu đã vận hành từ 12/2/2026 — tiện ích tầm đô thị đi trước nhịp bàn giao nhà, kéo dòng khách du lịch về ngay từ hôm nay.",
      "Với năng lực vận hành du lịch của Sun Group và quỹ đất mặt biển sở hữu lâu dài, Blanca City phù hợp cả nhu cầu ngôi nhà thứ hai lẫn khai thác cho thuê lưu trú — PaceLand tư vấn theo từng dòng sản phẩm và mục tiêu dòng tiền.",
      "Đang mở bán: tháp Beachtro Tower gồm 4 tòa E6, E7, E8, E9 với 1.785 căn hộ và 3 tầng hầm, liền kề công viên Whale Park 2,3 ha. Theo công bố của chủ đầu tư tại sự kiện Kick-off ngày 30/07/2026, đây là tháp căn hộ sở hữu lâu dài cuối cùng của Blanca City; bàn giao dự kiến tháng 8/2028."
    ],
    "zonesNote": "Quỹ căn của từng phân khu thay đổi theo tuần. Diện tích và giá là thông tin tham khảo tháng 9/2026, tổng hợp từ tài liệu bán hàng của chủ đầu tư và các đại lý phân phối; bảng giá chính thức áp dụng theo từng đợt mở bán. PaceLand xác nhận bảng hàng và chính sách đang có hiệu lực trước khi anh/chị đặt chỗ.",
    "zones": [
      {
        "name": "Beachtro Tower",
        "status": "Đang mở bán",
        "type": "Căn hộ · sở hữu lâu dài",
        "size": "Studio – 2PN+ · 35,7 – 82,3 m²",
        "price": "2,53 – 7,16 tỉ (9/2026)",
        "note": "4 tòa E6 – E9 với 1.785 căn, liền kề công viên Whale Park. E6 bàn giao hoàn thiện, E7 – E9 bàn giao không gian sáng tạo (DyHome). Bàn giao dự kiến 8/2028.",
        "image": "assets/img/beachtro/hero.webp",
        "link": "/beachtro-blanca-city.html",
        "linkLabel": "Xem trang phân khu"
      },
      {
        "name": "Beacon Tower",
        "slug": "beacon-tower",
        "status": "Đã mở bán",
        "type": "Căn hộ · sở hữu lâu dài",
        "size": "Studio · 1PN · 2PN · 32 – 75 m²",
        "price": "3 – 7 tỉ (9/2026)",
        "note": "Tháp căn hộ sở hữu lâu dài nằm mặt tiền đường 3 Tháng 2, kiến trúc lấy cảm hứng từ ngọn hải đăng Vũng Tàu, ra mắt tháng 4/2026. Cùng nhóm tháp sở hữu lâu dài với Beachtro.",
        "image": "assets/img/blanca/beacon-tower.webp"
      },
      {
        "name": "Căn hộ Blanca",
        "slug": "can-ho-blanca",
        "status": "Đã mở bán",
        "type": "Căn hộ nghỉ dưỡng · sở hữu có thời hạn",
        "size": "Studio – 2PN · 30 – 75 m²",
        "price": "2,8 – 6,5 tỉ (9/2026)",
        "note": "6 tòa tháp cao 34 – 40 tầng với 4.448 căn, hướng biển Bãi Sau và Mũi Nghinh Phong, khai thác lưu trú theo tiêu chuẩn khách sạn quốc tế.",
        "image": "assets/img/blanca/blanca-tower.webp"
      },
      {
        "name": "Biệt thự Casa Villa",
        "slug": "casa-villa",
        "status": "Đã mở bán",
        "type": "Biệt thự song lập & đơn lập · sở hữu lâu dài",
        "size": "Đất 131 – 280 m² · 3 tầng + 1 hầm",
        "price": "25 – 42 tỉ (9/2026)",
        "note": "Phân khu thấp tầng Casa, kiến trúc cảm hứng Iberia do Aedas thiết kế. Riêng dòng đơn lập có 176 căn, diện tích đất 266 – 280 m².",
        "image": "assets/img/blanca/casa-villa.webp"
      },
      {
        "name": "Casa Grand Villa",
        "slug": "casa-grand-villa",
        "status": "Đã mở bán",
        "type": "Biệt thự lớn · sở hữu lâu dài",
        "size": "Đất 308 – 319 m² · 4 tầng + 1 hầm",
        "price": "30 – 50 tỉ (9/2026)",
        "note": "Dòng biệt thự lớn nhất phân khu Casa, mặt tiền 16 m, có tầng hầm đa năng cho gara, phòng chiếu phim hoặc phòng tập tại gia.",
        "image": "assets/img/blanca/casa-grand-villa.webp"
      },
      {
        "name": "Casa Townhouse",
        "slug": "casa-townhouse",
        "status": "Đã mở bán",
        "type": "Nhà phố thương mại · sở hữu lâu dài",
        "size": "Đất 131 – 150 m² · 4 tầng + 1 hầm",
        "price": "12 – 30 tỉ (9/2026)",
        "note": "171 căn nhà phố kinh doanh trong phân khu Casa, đón dòng khách từ Sun World, trung tâm thương mại mặt biển và cư dân các tháp căn hộ. Tháng 9/2026, phần lớn nhà phố Casa đã lên mái.",
        "image": "assets/img/blanca/casa-townhouse.webp"
      }
    ],
    "amenities": [
      "Sun World 15 ha đã mở cửa",
      "Hai mặt tiền: 3 Tháng 2 & Bãi Sau",
      "Sở hữu lâu dài",
      "Hệ sinh thái du lịch Sun Group"
    ]
  },
  {
    "id": "five-star-odyssey",
    "name": "Five Star Odyssey",
    "developer": "Five Star Group",
    "location": "165 Thùy Vân, Bãi Sau (TP. Vũng Tàu cũ), TP.HCM",
    "area": "Vùng ven & nghỉ dưỡng",
    "segment": "Nghỉ dưỡng",
    "type": "Căn hộ",
    "status": "Sắp ra mắt",
    "offmarket": false,
    "badge": "Tháp 199,5 m mặt biển",
    "priceText": "Chưa công bố",
    "priceValue": 0,
    "beds": "Căn hộ du lịch · penthouse",
    "size": "996 căn + 427 phòng KS",
    "handover": "Đang cập nhật",
    "cover": "assets/img/media/five-star-odyssey.jpg",
    "gallery": [
      "assets/img/media/five-star-odyssey.jpg"
    ],
    "short": "Tháp căn hộ du lịch – khách sạn 5 sao cao 199,5 m (50 tầng) của Five Star Group đối diện công viên biển Bãi Sau — 996 căn hộ du lịch và 427 phòng khách sạn chuẩn Mövenpick; thi công phần thân từ 13/7/2026.",
    "description": [
      "Five Star Odyssey là tổ hợp căn hộ du lịch và khách sạn 5 sao tại 165 Thùy Vân — một tháp 50 tầng nổi, 4 tầng hầm, cao 199,5 m trên khu đất 8.189 m² đối diện công viên biển Bãi Sau. Theo giấy phép xây dựng, dự án gồm 996 căn hộ du lịch và 427 phòng khách sạn vận hành chuẩn Mövenpick.",
      "Dự án khởi công ngày 21/6/2025 và bước vào thi công kết cấu phần thân từ 13/7/2026. Sản phẩm thuộc loại hình sở hữu có thời hạn trên đất thương mại dịch vụ — thiên về khai thác dòng tiền lưu trú; PaceLand luôn tư vấn rõ cấu trúc pháp lý này trước khi khách quyết định."
    ],
    "amenities": [
      "Cao 199,5 m — điểm nhấn Bãi Sau",
      "Vận hành chuẩn Mövenpick",
      "Đối diện công viên biển",
      "Đang thi công phần thân"
    ]
  },
  {
    "id": "five-star-poseidon",
    "name": "Five Star Poseidon",
    "developer": "Agritour (Five Star Group)",
    "location": "57–59 Thùy Vân, Bãi Sau (TP. Vũng Tàu cũ), TP.HCM",
    "area": "Vùng ven & nghỉ dưỡng",
    "segment": "Nghỉ dưỡng",
    "type": "Căn hộ",
    "status": "Sắp ra mắt",
    "offmarket": false,
    "badge": "Meliá vận hành (dự kiến)",
    "priceText": "Chưa công bố",
    "priceValue": 0,
    "beds": "≈1.070 căn nghỉ dưỡng",
    "size": "Tháp đôi 43 tầng · 8.730 m²",
    "handover": "Đang cập nhật",
    "cover": "assets/img/media/five-star-poseidon.jpg",
    "gallery": [
      "assets/img/media/five-star-poseidon.jpg"
    ],
    "short": "Tháp đôi 43 tầng của Agritour (Five Star Group) mặt tiền đường biển Thùy Vân — khoảng 1.070 căn hộ nghỉ dưỡng và 460 phòng khách sạn; Newtecons làm tổng thầu, dự kiến Meliá Hotels International vận hành.",
    "description": [
      "Five Star Poseidon là tổ hợp căn hộ du lịch và khách sạn 5 sao dạng tháp đôi 43 tầng nổi, 3 tầng hầm trên khu đất 8.730 m² tại 57–59 Thùy Vân — trục đường biển trung tâm Bãi Sau. Quy mô khoảng 1.070 căn hộ nghỉ dưỡng cùng 460 phòng khách sạn.",
      "Dự án khởi công ngày 21/6/2025 với Newtecons làm tổng thầu xây dựng; phần khách sạn dự kiến do Meliá Hotels International vận hành. Đây là sản phẩm sở hữu có thời hạn, phù hợp nhà đầu tư dòng tiền lưu trú tại thị trường biển sát TP.HCM — PaceLand tư vấn rõ khung pháp lý trước khi xuống tiền."
    ],
    "amenities": [
      "Tháp đôi 43 tầng mặt biển",
      "Meliá vận hành (dự kiến)",
      "Tổng thầu Newtecons",
      "Cùng trục với Five Star Odyssey"
    ]
  },
  {
    "id": "solina-vung-tau",
    "name": "Solina Vũng Tàu",
    "developer": "C-Holdings",
    "location": "Bãi Thủy Tiên, P. Rạch Dừa (TP. Vũng Tàu cũ), TP.HCM",
    "area": "Vùng ven & nghỉ dưỡng",
    "segment": "Nghỉ dưỡng",
    "type": "Căn hộ",
    "status": "Sắp ra mắt",
    "offmarket": false,
    "badge": "Sát biển Bãi Thủy Tiên",
    "priceText": "Chưa công bố",
    "priceValue": 0,
    "beds": "≈914 phòng & căn hộ",
    "size": "1,19 ha · tòa 26 + 37 tầng",
    "handover": "Đang cập nhật",
    "cover": "assets/img/media/solina-vung-tau.jpg",
    "gallery": [
      "assets/img/media/solina-vung-tau.jpg"
    ],
    "short": "Tổ hợp khách sạn 26 tầng và căn hộ du lịch 37 tầng của C-Holdings trên 11.893 m² sát Bãi Thủy Tiên — công bố tên tháng 9/2026, khoảng 914 phòng và căn hộ, chưa có bảng giá.",
    "description": [
      "Solina Vũng Tàu là tổ hợp nghỉ dưỡng của C-Holdings trên khu đất 11.893 m² sát biển Bãi Thủy Tiên, phường Rạch Dừa — gồm tòa khách sạn 26 tầng và tòa căn hộ du lịch 37 tầng, tổng khoảng 914 phòng và căn hộ.",
      "Dự án vừa công bố tên thương mại tháng 9/2026, chưa có bảng giá; đất thương mại dịch vụ có thời hạn sử dụng đến tháng 12/2067. PaceLand sẽ cập nhật cấu trúc sản phẩm và chính sách bán hàng ngay khi chủ đầu tư công bố — đăng ký trước để nhận thông tin sớm."
    ],
    "amenities": [
      "Sát biển Bãi Thủy Tiên",
      "Khách sạn + căn hộ du lịch",
      "Thời hạn đất đến 12/2067",
      "Mới công bố tên 09/2026"
    ]
  },
  {
    "id": "vinhomes-green-paradise",
    "name": "Vinhomes Green Paradise",
    "developer": "Vinhomes",
    "location": "Xã Cần Giờ, TP.HCM",
    "area": "Vùng ven & nghỉ dưỡng",
    "segment": "Cao cấp",
    "type": "Biệt thự",
    "status": "Đang mở bán",
    "offmarket": false,
    "badge": "Lấn biển 2.870 ha",
    "priceText": "Liên hệ bảng giá",
    "priceValue": 0,
    "beds": "Nhà phố · biệt thự · căn hộ",
    "size": "2.870 ha · 12 km bờ biển",
    "handover": "Đang cập nhật",
    "cover": "assets/img/media/vinhomes-green-paradise.jpg",
    "gallery": [
      "assets/img/media/vinhomes-green-paradise.jpg"
    ],
    "short": "Khu đô thị du lịch lấn biển 2.870 ha của Vinhomes tại Cần Giờ với 12 km bờ biển — khởi công 19/4/2025, siêu dự án định hình cực phát triển hướng biển của TP.HCM.",
    "description": [
      "Vinhomes Green Paradise là khu đô thị du lịch lấn biển quy mô 2.870 ha tại Cần Giờ — thuộc nhóm dự án đô thị lớn nhất Việt Nam, sở hữu 12 km bờ biển. Dự án khởi công ngày 19/4/2025, cơ cấu sản phẩm trải từ nhà phố, biệt thự đến căn hộ với hình thức sở hữu lâu dài.",
      "Định vị \"thành phố biển trong lòng TP.HCM\" cộng hệ tiện ích đô thị Vingroup khiến đây là quỹ hàng chiến lược cho khách tích sản đón chu kỳ hạ tầng hướng biển — cầu Cần Giờ và trục kết nối về trung tâm. PaceLand tư vấn chọn phân khu và dòng sản phẩm theo khẩu vị đầu tư của từng khách."
    ],
    "amenities": [
      "12 km bờ biển",
      "Sở hữu lâu dài",
      "Hệ tiện ích đô thị Vingroup",
      "Đón chu kỳ hạ tầng hướng biển"
    ]
  },
  {
    "id": "vinhomes-saigon-park",
    "name": "Vinhomes Saigon Park",
    "developer": "Vinhomes",
    "location": "Xuân Thới Sơn (Hóc Môn cũ), TP.HCM",
    "area": "Vùng ven & nghỉ dưỡng",
    "segment": "Cao cấp",
    "type": "Nhà phố thương mại",
    "status": "Đang mở bán",
    "offmarket": false,
    "badge": "Đô thị đại học 1.080 ha",
    "priceText": "Liên hệ bảng giá",
    "priceValue": 0,
    "beds": "Nhà phố · biệt thự · shophouse",
    "size": "1.080 ha",
    "handover": "Đang cập nhật",
    "cover": "assets/img/media/vinhomes-saigon-park.jpg",
    "gallery": [
      "assets/img/media/vinhomes-saigon-park.jpg"
    ],
    "short": "Khu đô thị đại học 1.080 ha của Vinhomes tại Tây Bắc TP.HCM — sân golf 36 hố, quy hoạch cho 135.000 cư dân, khởi công 29/4/2026.",
    "description": [
      "Vinhomes Saigon Park là khu đô thị vệ tinh quy mô 1.080 ha tại Xuân Thới Sơn (Hóc Môn cũ), phía Tây Bắc TP.HCM — quy hoạch theo mô hình đô thị đại học cho khoảng 135.000 cư dân, tích hợp sân golf 36 hố. Dự án khởi công ngày 29/4/2026.",
      "Đây là bước mở rộng chuỗi đại đô thị Vinhomes sang cực Tây Bắc, đón trục Vành đai 3 và cao tốc TP.HCM – Mộc Bài. Sản phẩm thấp tầng sở hữu lâu dài, phù hợp khách tích sản theo quy hoạch chuẩn với mặt bằng giá vùng ven — PaceLand cập nhật giỏ hàng theo từng đợt ra mắt."
    ],
    "amenities": [
      "Sân golf 36 hố trong khu",
      "Quy hoạch 135.000 cư dân",
      "Đón Vành đai 3 & cao tốc Mộc Bài",
      "Chuẩn vận hành Vinhomes"
    ]
  }
];

const POSTS = [
  {
    "id": "tam-8-ti-nen-mua-the-prive-hay-eaton-park",
    "title": "Tầm 8 tỉ nên mua The Privé hay Eaton Park? So sánh chi tiết 09/2026",
    "category": "So sánh dự án",
    "date": "10/09/2026",
    "readtime": "7 phút đọc",
    "cover": "assets/img/media/eaton-park-2.jpg",
    "excerpt": "Với ~8 tỉ: The Privé cho căn 1PN từ ~6,6 tỉ (đơn giá ~133 triệu/m²) và còn dư ngân sách; Eaton Park cần nhích lên ~9,5 tỉ nhưng nhận nhà ngay từ Quý 2/2026. Bảng so sánh 8 tiêu chí và gợi ý chọn theo từng mục tiêu.",
    "body": [
      {
        "t": "p",
        "c": "Trả lời nhanh: với đúng <b>8 tỉ</b>, <a href='/du-an/the-prive.html'>The Privé</a> là lựa chọn vừa vặn — căn 1PN từ ~6,6 tỉ (đơn giá tham khảo ~133 triệu/m² tim tường, chưa VAT — 07/2026), còn dư ngân sách cho nội thất và chi phí. <a href='/du-an/eaton-park.html'>Eaton Park</a> có 1PN từ ~9,5 tỉ — vượt tầm 8 tỉ khoảng 15–20%, đổi lại <b>nhận nhà ngay từ Quý 2/2026</b>."
      },
      {
        "t": "p",
        "c": "Điểm thú vị: cả hai dự án đều nằm tại phường An Phú (cũ), TP. Thủ Đức — cách nhau chỉ vài phút di chuyển, cùng phân khúc hạng sang, nên đây là cặp so sánh trực tiếp phổ biến nhất Khu Đông hiện nay."
      },
      {
        "t": "h",
        "c": "Bảng so sánh The Privé vs Eaton Park (09/2026)"
      },
      {
        "t": "table",
        "c": {
          "head": [
            "Tiêu chí",
            "The Privé",
            "Eaton Park"
          ],
          "rows": [
            [
              "Chủ đầu tư",
              "Bluemarq Group (Đất Xanh cũ)",
              "Gamuda Land (Malaysia)"
            ],
            [
              "Vị trí",
              "Nam Rạch Chiếc — 2 mặt sông Giồng Ông Tố",
              "Mặt tiền đại lộ Mai Chí Thọ"
            ],
            [
              "Quy mô",
              "6,7 ha · 12 tháp 33–35 tầng · 3.175 căn",
              "3,76 ha · 6 tháp 29–39 tầng · 1.980 căn + 72 shophouse"
            ],
            [
              "Giá 1PN (tham khảo 07/2026)",
              "Từ ~6,6 tỉ (≈49,8 m²)",
              "9,5–10,5 tỉ (51,9–55,8 m²)"
            ],
            [
              "Giá 2–3PN",
              "Theo giỏ hàng từng đợt, đơn giá ~133 tr/m²",
              "2PN 13,5–15 tỉ · 3PN 20,5–21,5 tỉ"
            ],
            [
              "Bàn giao",
              "Đang cập nhật",
              "Từ Quý 2/2026 (PK1 đang bàn giao)"
            ],
            [
              "Mật độ & tiện ích",
              "25% — 3 hồ bơi, boxing & golf 3D, tennis, pickleball, rạp phim mini",
              "Golf 3D, sân thể thao đa năng, pet park, công viên ven sông, phố thương mại"
            ],
            [
              "Thế mạnh nổi bật",
              "Giá vào thấp hơn, quỹ căn lớn, 2 mặt sông",
              "Nhận nhà ngay, chuẩn bàn giao Gamuda, tệp khách thuê chuyên gia"
            ]
          ]
        }
      },
      {
        "t": "h",
        "c": "Chọn theo mục tiêu của bạn"
      },
      {
        "t": "ul",
        "c": [
          "<b>Ngân sách đúng 8 tỉ, ưu tiên vừa túi:</b> The Privé — vào 1PN từ ~6,6 tỉ, còn dư 1–1,5 tỉ dự phòng nội thất, thuế phí.",
          "<b>Cần ở ngay hoặc cho thuê ngay trong 2026:</b> Eaton Park — bàn giao từ Q2/2026, trục Mai Chí Thọ có sẵn tệp khách thuê chuyên gia nước ngoài.",
          "<b>Đầu tư đón chu kỳ giá:</b> The Privé mở bán nhiều đợt theo 12 tháp — cơ hội vào sớm ở các đợt giá đầu; Eaton Park mặt bằng giá đã qua 3 giai đoạn.",
          "<b>Dùng đòn bẩy ngân hàng:</b> tính thử lãi vay và dòng tiền tại <a href='/cong-cu.html'>Công cụ tài sản PaceLand</a> trước khi quyết định."
        ]
      },
      {
        "t": "h",
        "c": "Hỏi nhanh"
      },
      {
        "t": "ul",
        "c": [
          "<b>8 tỉ mua được căn nào ở Eaton Park?</b> — Rất khó: 1PN đã từ ~9,5 tỉ (07/2026). Cần nhích ngân sách, hoặc chọn The Privé.",
          "<b>The Privé bao giờ bàn giao?</b> — Chủ đầu tư chưa công bố mốc chính thức; PaceLand cập nhật theo từng đợt mở bán.",
          "<b>Giá trên đã gồm VAT chưa?</b> — Chưa: đơn giá The Privé ~133 tr/m² là giá tim tường chưa VAT; số Eaton Park là giá giỏ hàng GĐ3 tham khảo 07/2026."
        ]
      },
      {
        "t": "p",
        "c": "Muốn xem bảng giá chi tiết, mặt bằng tầng và quỹ căn đẹp của cả hai dự án? Gọi <b>0903 983 737</b> hoặc để lại thông tin tại <a href='/lien-he.html'>trang liên hệ</a> — Cố vấn PaceLand phản hồi trong ngày. Đọc thêm: <a href='/bai-viet/bang-gia-can-ho-cao-cap-tphcm-theo-khu-vuc.html'>bảng giá căn hộ cao cấp TP.HCM theo khu vực</a>."
      }
    ]
  },
  {
    "id": "top-du-an-can-ho-cao-cap-tphcm-2026",
    "title": "Top dự án căn hộ cao cấp TP.HCM 2026: bảng so sánh theo khu vực",
    "category": "Thị trường",
    "date": "03/07/2026",
    "readtime": "9 phút đọc",
    "cover": "assets/img/media/the-prive-1.jpg",
    "excerpt": "Bảng so sánh 7 dự án căn hộ cao cấp đáng chú ý nhất TP.HCM 2026 theo giá, diện tích, thời điểm bàn giao — kèm gợi ý chọn theo từng mục tiêu: ở, tích sản hay dòng tiền.",
    "body": [
      {
        "t": "p",
        "c": "Nếu bạn chỉ có 30 giây: <b>The Privé</b> (Nam Rạch Chiếc – An Phú, từ ~6,6 tỉ) và <b>Eaton Park</b> (An Phú, từ 9,5 tỉ) là hai dự án hạng sang đáng chú ý nhất đang mở bán; <b>One Central Saigon</b> (căn hộ hàng hiệu Ritz-Carlton đối diện chợ Bến Thành) và <b>The Metropole Thủ Thiêm</b> (chuyển nhượng 330–500 triệu/m²) là lựa chọn lõi trung tâm cho ngân sách lớn; còn <b>Gladia Heights</b> (từ 4,4 tỉ) là suất vào hợp lý cho người muốn đón hạ tầng Khu Đông. Bảng so sánh chi tiết bên dưới."
      },
      {
        "t": "p",
        "c": "Danh sách này dựa trên 4 tiêu chí PaceLand dùng khi thẩm định mọi dự án: vị trí và hạ tầng kết nối, năng lực chủ đầu tư, pháp lý, và dư địa chu kỳ giá. Phạm vi gồm các dự án PaceLand trực tiếp phân phối hoặc theo dõi dữ liệu giao dịch — cập nhật tháng 7/2026."
      },
      {
        "t": "h",
        "c": "Bảng so sánh nhanh 7 dự án tiêu biểu"
      },
      {
        "t": "table",
        "c": {
          "head": [
            "Dự án",
            "Khu vực",
            "Phân khúc",
            "Giá tham khảo",
            "Diện tích",
            "Bàn giao"
          ],
          "rows": [
            [
              "<a href='/du-an/the-prive.html'>The Privé</a>",
              "Nam Rạch Chiếc, Khu Đông",
              "Hạng sang",
              "Từ ~6,6 tỉ",
              "49,8–98,5 m²",
              "Đang cập nhật"
            ],
            [
              "<a href='/du-an/eaton-park.html'>Eaton Park</a>",
              "An Phú, Khu Đông",
              "Hạng sang",
              "Từ 9,5 tỉ",
              "51,9–104,8 m²",
              "Từ Q2/2026"
            ],
            [
              "<a href='/du-an/one-central-saigon.html'>One Central Saigon</a>",
              "Bến Thành (Quận 1 cũ)",
              "Siêu sang · hàng hiệu",
              "Chưa công bố",
              "Chưa công bố",
              "Chưa công bố"
            ],
            [
              "<a href='/du-an/metropole-thu-thiem.html'>The Metropole Thủ Thiêm</a>",
              "Thủ Thiêm",
              "Hạng sang · chuyển nhượng",
              "330–500 tr/m² (05/2026)",
              "47,44–380 m²",
              "3/4 phân khu đã bàn giao"
            ],
            [
              "<a href='/du-an/the-global-city.html'>The Global City</a>",
              "An Phú, Khu Đông",
              "Hạng sang · 6 phân khu",
              "Căn hộ từ 6,7 tỉ (09/2026)",
              "47–139 m² (căn hộ)",
              "Theo phân khu"
            ],
            [
              "<a href='/du-an/gladia-heights.html'>Gladia Heights</a>",
              "Võ Chí Công, Khu Đông",
              "Cao cấp",
              "Từ 4,4 tỉ (09/2026)",
              "50,3–144,2 m²",
              "Quý IV/2027"
            ],
            [
              "<a href='/du-an/vinhomes-grand-park.html'>Vinhomes Grand Park</a>",
              "Long Bình (TP Thủ Đức cũ)",
              "Cao cấp",
              "Từ 2,1 tỉ (12/2025)",
              "27–108 m²",
              "Phần lớn đã bàn giao"
            ]
          ]
        }
      },
      {
        "t": "h",
        "c": "Chọn theo mục tiêu của bạn"
      },
      {
        "t": "ul",
        "c": [
          "<b>Ở sang trọng, giữ giá bền:</b> The Privé hoặc Eaton Park — hai dự án hạng sang đang mở bán với chủ đầu tư mạnh và vị trí lõi Khu Đông",
          "<b>Tích sản lõi trung tâm, ngân sách lớn:</b> One Central Saigon (căn hộ Ritz-Carlton đối diện chợ Bến Thành, chờ công bố giá) hoặc căn chuyển nhượng The Metropole Thủ Thiêm, nơi nguồn cung mới gần như đã khép lại",
          "<b>Ngân sách quanh 5 tỉ, đón hạ tầng:</b> Gladia Heights — 1PN từ 4,4 tỉ (09/2026), 3 tháp 15 tầng mật độ thấp trên trục Võ Chí Công",
          "<b>Ngân sách dưới 4 tỉ, ưu tiên cho thuê:</b> Vinhomes Grand Park — hơn 70.000 cư dân, studio từ 2,1 tỉ (12/2025), giá thuê studio khoảng 4,5–6,5 triệu/tháng (08/2026)"
        ]
      },
      {
        "t": "h",
        "c": "Ba lưu ý trước khi chốt"
      },
      {
        "t": "ul",
        "c": [
          "So sánh bằng đơn giá/m² giữa các dự án cùng khu vực, đừng so bằng tổng giá căn",
          "Pháp lý xét theo từng đợt mở bán, không theo danh tiếng dự án — luôn kiểm tra văn bản đủ điều kiện bán mới nhất",
          "Chính sách thanh toán và chiết khấu làm giá thực tế chênh nhau đáng kể giữa các đợt — hỏi giá thực thanh toán, không chỉ giá niêm yết"
        ]
      },
      {
        "t": "q",
        "c": "Dự án tốt nhất không phải dự án nổi tiếng nhất — mà là dự án đúng mục tiêu của bạn, mua ở mức giá đúng."
      },
      {
        "t": "h",
        "c": "Hỏi nhanh"
      },
      {
        "t": "ul",
        "c": [
          "<b>Giá trên đã là giá cuối chưa?</b> — Chưa; giá thực còn phụ thuộc chính sách từng đợt và vị trí căn. Để lại thông tin để nhận bảng giá chính xác tại thời điểm hỏi.",
          "<b>Mua trực tiếp chủ đầu tư có rẻ hơn qua PaceLand?</b> — Không; giá do chủ đầu tư niêm yết thống nhất, PaceLand không thu phí người mua và còn giữ suất ưu tiên giai đoạn sớm.",
          "<b>Danh sách này có được trả tiền để xếp hạng?</b> — Không; đây là danh mục thẩm định của PaceLand, tiêu chí công khai ở đầu bài."
        ]
      },
      {
        "t": "p",
        "c": "Số liệu trong bài là khoảng tham khảo tại tháng 7/2026 và có thể thay đổi theo giỏ hàng từng đợt. Để nhận bảng giá và quỹ căn chính xác hôm nay, gọi <b>0903 983 737</b> hoặc để lại thông tin tại <a href='/lien-he.html'>trang liên hệ</a> — tư vấn miễn phí, bảo mật."
      }
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
      {
        "t": "p",
        "c": "Câu trả lời ngắn: đơn giá căn hộ cao cấp TP.HCM năm 2026 nằm trong khoảng <b>30–350 triệu đồng/m²</b> tuỳ khu vực. Cao nhất là lõi Quận 1 (150–350 triệu/m²), kế đến Thủ Thiêm (120–220), Thảo Điền – An Phú (85–140); vùng giá dễ tiếp cận nhất của phân khúc cao cấp là Khu Đông mở rộng (55–90) và vùng ven (30–55)."
      },
      {
        "t": "table",
        "c": {
          "head": [
            "Khu vực",
            "Đơn giá (triệu/m²)",
            "Căn 2PN ~70m² ước tính",
            "Đặc điểm"
          ],
          "rows": [
            [
              "Quận 1 (lõi trung tâm)",
              "150–350",
              "10,5 – 24,5 tỉ",
              "Siêu sang, nguồn cung rất hiếm"
            ],
            [
              "Thủ Thiêm",
              "120–220",
              "8,4 – 15,4 tỉ",
              "CBD mới, quỹ đất hữu hạn"
            ],
            [
              "Thảo Điền – An Phú",
              "85–140",
              "6,0 – 9,8 tỉ",
              "Cộng đồng quốc tế, cầu thuê mạnh"
            ],
            [
              "Trung tâm mở rộng (Bình Thạnh, Q3, Q10)",
              "75–130",
              "5,3 – 9,1 tỉ",
              "Gần lõi, nguồn cung đa dạng"
            ],
            [
              "Khu Nam (Q7, Nhà Bè)",
              "60–110",
              "4,2 – 7,7 tỉ",
              "Phú Mỹ Hưng và dải ven sông"
            ],
            [
              "Khu Đông khác (TP. Thủ Đức)",
              "55–90",
              "3,9 – 6,3 tỉ",
              "Đón metro và vành đai"
            ],
            [
              "Vùng ven & tỉnh lân cận",
              "30–55",
              "2,1 – 3,9 tỉ",
              "Đô thị vệ tinh, nghỉ dưỡng"
            ]
          ]
        }
      },
      {
        "t": "h",
        "c": "Cách đọc bảng giá cho đúng"
      },
      {
        "t": "p",
        "c": "Dải giá mỗi khu vực rộng vì ba lý do: vị trí lô đất trong khu (mặt sông, mặt công viên chênh hẳn phía trong), giai đoạn dự án (mở bán sớm rẻ hơn cận bàn giao), và chính sách bán từng đợt (chiết khấu thanh toán nhanh có thể tương đương giảm 5–10%). Vì vậy hãy dùng bảng này để định vị khu vực, còn quyết định mua bán cần con số của đúng toà, đúng căn."
      },
      {
        "t": "h",
        "c": "Yếu tố khiến căn của bạn lệch khỏi khoảng chung"
      },
      {
        "t": "ul",
        "c": [
          "Tầng cao, view đẹp: cộng khoảng 5–10% so với căn cùng loại",
          "Nội thất hoàn thiện đầy đủ: cộng khoảng 5%",
          "Pháp lý mới ở dạng hợp đồng mua bán (chưa sổ): trừ khoảng 5–10%",
          "Căn đã qua sử dụng: trừ khoảng 5–10% tuỳ hiện trạng"
        ]
      },
      {
        "t": "p",
        "c": "Bạn có thể tự ước tính giá trị một căn cụ thể theo đúng các hệ số trên bằng <a href='/cong-cu.html#dinh-gia'>công cụ định giá miễn phí</a> của PaceLand — chọn khu vực, loại hình, diện tích là có ngay khoảng giá."
      },
      {
        "t": "q",
        "c": "Bảng giá cho bạn biết mình đang đứng ở đâu. Giao dịch thực tế cho bạn biết mình nên trả bao nhiêu."
      },
      {
        "t": "h",
        "c": "Hỏi nhanh"
      },
      {
        "t": "ul",
        "c": [
          "<b>Số liệu này lấy từ đâu?</b> — Tổng hợp từ giỏ hàng các dự án PaceLand phân phối và dữ liệu giao dịch thị trường mà đội ngũ theo dõi; là khoảng tham khảo, không phải giá niêm yết của bất kỳ dự án cụ thể nào.",
          "<b>Bao lâu cập nhật một lần?</b> — PaceLand xem lại định kỳ; bản này phản ánh mặt bằng năm 2026. Giá điểm của từng dự án thay đổi theo đợt mở bán.",
          "<b>Muốn định giá chính xác căn đang có?</b> — Chuyên gia PaceLand thẩm định miễn phí dựa trên giao dịch thực tế cùng khu vực: gọi 0903 983 737."
        ]
      },
      {
        "t": "p",
        "c": "Cần bảng giá chi tiết của một dự án cụ thể? Để lại thông tin tại <a href='/lien-he.html'>trang liên hệ</a> hoặc gọi <b>0903 983 737</b> — cố vấn PaceLand gửi giỏ hàng và chính sách mới nhất trong ngày."
      }
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
      {
        "t": "p",
        "c": "Sau nhiều năm chờ đợi, Thủ Thiêm đang bước vào giai đoạn sôi động nhất kể từ khi quy hoạch bán đảo được phê duyệt. Hạ tầng kết nối về trung tâm đã hoàn thiện, các cây cầu và trục chính hoạt động ổn định, và quan trọng nhất: những chủ đầu tư uy tín nhất thị trường đều đã có mặt."
      },
      {
        "t": "p",
        "c": "Đại Quang Minh tiếp tục hoàn thiện khu đô thị Sala. SonKim Land đã bàn giao ba phân khu The Galleria, The Crest, The Opera của The Metropole và đang xây phân khu cuối The OpusK (dự kiến quý II/2027), nên quỹ căn chuyển nhượng tại đây ngày càng hiếm. Các lô đất ven sông còn lại đều đã có chủ với kế hoạch triển khai trong 2–3 năm tới."
      },
      {
        "t": "h",
        "c": "Vì sao nguồn cung Thủ Thiêm luôn khan"
      },
      {
        "t": "p",
        "c": "Khác với phần lớn khu vực, Thủ Thiêm có ranh giới quy hoạch cứng: tổng quỹ đất ở là hữu hạn và không thể mở rộng. Mỗi dự án mới ra mắt đồng nghĩa quỹ đất còn lại ít đi — đây là nền tảng của câu chuyện tăng giá dài hạn, thứ mà rất ít khu vực tại Việt Nam có được."
      },
      {
        "t": "q",
        "c": "Ở Thủ Thiêm, thứ khan hiếm không phải là căn hộ — mà là đất để xây căn hộ."
      },
      {
        "t": "p",
        "c": "Mặt bằng đơn giá căn hộ khu vực này hiện dao động quanh 120–220 triệu/m² tuỳ vị trí và giai đoạn bàn giao. Khoảng cách lớn giữa các dự án phản ánh đúng bản chất: vị trí lô đất, tầm nhìn và pháp lý từng dự án quyết định giá trị, không phải cái mác “Thủ Thiêm” chung chung."
      },
      {
        "t": "h",
        "c": "Người mua nên đứng ở đâu"
      },
      {
        "t": "ul",
        "c": [
          "Mua để ở dài hạn: ưu tiên dự án đã bàn giao, cộng đồng hình thành, pháp lý sạch",
          "Đầu tư tăng trưởng: theo dõi các đợt ra hàng sớm của dự án mới — biên lợi nhuận nằm ở quyền tiếp cận trước",
          "Dòng tiền cho thuê: nhắm tệp chuyên gia nước ngoài làm việc tại trung tâm, ưu tiên căn 1–2 phòng ngủ"
        ]
      },
      {
        "t": "p",
        "c": "PaceLand đang giữ một số căn vị trí đẹp tại Thủ Thiêm trong quỹ hàng giao dịch kín — được chia sẻ trực tiếp cho khách hàng trong mạng lưới trước khi công bố rộng rãi."
      }
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
      {
        "t": "p",
        "c": "Từ khi vận hành thương mại cuối năm 2024, Metro số 1 đã làm được điều quan trọng nhất: thay đổi thói quen di chuyển của một bộ phận cư dân phía Đông. Tuyến đường sắt đô thị đầu tiên của thành phố kết nối Bến Thành với Suối Tiên, chạy dọc trục xương sống của TP. Thủ Đức."
      },
      {
        "t": "p",
        "c": "Kinh nghiệm từ các đô thị châu Á cho thấy bất động sản trong bán kính đi bộ đến nhà ga thường thiết lập mặt bằng giá cao hơn khu vực lân cận từ 10–20% sau vài năm vận hành. TP.HCM đang đi đúng quỹ đạo đó, nhưng với một điều kiện quan trọng."
      },
      {
        "t": "h",
        "c": "Bán kính 800 mét — thước đo thực tế"
      },
      {
        "t": "p",
        "c": "Giá trị “gần metro” chỉ có nghĩa khi cư dân thực sự đi bộ được đến ga: khoảng 800 mét, tương đương 10 phút đi bộ. Xa hơn khoảng cách đó, metro chỉ còn là câu chuyện quảng cáo. Khi thẩm định một dự án “cạnh metro”, câu hỏi đầu tiên của PaceLand luôn là: từ sảnh toà nhà đến cửa soát vé mất bao nhiêu phút thật?"
      },
      {
        "t": "ul",
        "c": [
          "Cụm Thảo Điền – An Phú: hưởng lợi kép từ metro và cộng đồng quốc tế sẵn có",
          "Cụm Rạch Chiếc – Bình Thái: quỹ đất chuyển mình, nhiều dự án mới bám các nhà ga giữa tuyến",
          "Cụm Suối Tiên – khu Công nghệ cao: cầu thuê từ kỹ sư, chuyên gia và sinh viên Đại học Quốc gia"
        ]
      },
      {
        "t": "q",
        "c": "Metro không làm mọi dự án tăng giá — nó chỉ khuếch đại giá trị của những dự án vốn đã tốt."
      },
      {
        "t": "p",
        "c": "Bài học sau hơn một năm: các dự án chất lượng gần ga giữ giá và cho thuê tốt hơn rõ rệt, trong khi các dự án trung bình dù gần ga vẫn ì ạch. Hạ tầng là chất xúc tác, không phải phép màu. Sản phẩm, pháp lý và cộng đồng cư dân vẫn là gốc rễ của giá trị."
      }
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
      {
        "t": "p",
        "c": "“Khu Đông” là cách gọi tiện lợi nhưng dễ gây ngộ nhận: bên trong TP. Thủ Đức tồn tại ít nhất năm tiểu thị trường với động lực, mặt bằng giá và tệp khách khác hẳn nhau. Đặt sai sản phẩm vào sai cực, nhà đầu tư có thể chờ rất lâu mà không thấy thành quả."
      },
      {
        "t": "h",
        "c": "1. Thủ Thiêm — cực tài chính, giá trị biểu tượng"
      },
      {
        "t": "p",
        "c": "Quỹ đất hữu hạn, quy hoạch cứng, các chủ đầu tư hàng đầu. Đây là nơi dành cho tài sản tích luỹ dài hạn và những sản phẩm mang tính sưu tầm. Mặt bằng giá cao nhất Khu Đông và ít biến động theo sóng ngắn hạn."
      },
      {
        "t": "h",
        "c": "2. An Phú – Thảo Điền — cực lifestyle quốc tế"
      },
      {
        "t": "p",
        "c": "Cộng đồng nước ngoài, trường quốc tế, hệ sinh thái ẩm thực ven sông. The Global City đang định hình vai trò “downtown mới” với quảng trường và đại lộ thương mại. Cầu thuê bền là điểm mạnh nhất của cực này."
      },
      {
        "t": "h",
        "c": "3. Rạch Chiếc – Bình Thái — cực chuyển mình giữa tuyến"
      },
      {
        "t": "p",
        "c": "Bám metro và các trục mới mở, quỹ đất còn dư địa, nhiều dự án trung – cao cấp ra hàng. Phù hợp nhà đầu tư đi theo tiến độ hạ tầng với tầm nhìn 3–5 năm."
      },
      {
        "t": "h",
        "c": "4. Trường Thọ — cực đô thị sáng tạo"
      },
      {
        "t": "p",
        "c": "Khu cảng cũ được quy hoạch chuyển đổi thành đô thị mới ven sông. Câu chuyện dài hơi, biến số quy hoạch còn nhiều — biên an toàn nằm ở giá vốn thấp và sự kiên nhẫn."
      },
      {
        "t": "h",
        "c": "5. Vành đai Grand Park – cửa ngõ Đông Bắc — cực đại đô thị vệ tinh"
      },
      {
        "t": "p",
        "c": "Các đại đô thị như Vinhomes Grand Park đã tạo cộng đồng cư dân đông đúc thật; các dự án mới như Gladia Heights đón đầu vành đai và metro mở rộng với mức giá còn mềm. Đây là cực có mức giá vào thấp nhất và dư địa tăng theo hạ tầng rõ nhất."
      },
      {
        "t": "q",
        "c": "Không có “giá Khu Đông” — chỉ có giá của từng cực, từng dự án, từng thời điểm."
      },
      {
        "t": "p",
        "c": "Nguyên tắc của PaceLand: xác định cực phù hợp với mục tiêu (tích sản, dòng tiền hay tăng trưởng) trước, rồi mới chọn dự án. Đi ngược thứ tự đó là nguồn gốc của phần lớn quyết định sai."
      }
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
      {
        "t": "p",
        "c": "Mỗi công trình hạ tầng lớn tạo ra ba đợt sóng giá: khi quy hoạch được công bố, khi công trường khởi công, và khi công trình đi vào vận hành. Điều ít người để ý: phần tăng giá lớn nhất thường diễn ra ở pha giữa — khi máy móc đang chạy ngoài công trường — chứ không phải khi cắt băng khánh thành."
      },
      {
        "t": "h",
        "c": "Ba pha của một con sóng hạ tầng"
      },
      {
        "t": "ul",
        "c": [
          "Pha công bố: giá chạy theo tin, rủi ro cao nhất vì quy hoạch có thể điều chỉnh hoặc kéo dài",
          "Pha thi công: kỳ vọng chuyển thành hiện thực nhìn thấy được — dòng tiền lớn bắt đầu vào, giá tăng bền hơn",
          "Pha vận hành: mặt bằng giá mới được thiết lập; người mua cuối và người thuê trả tiền cho giá trị thật"
        ]
      },
      {
        "t": "p",
        "c": "Khu Đông hiện có đủ cả ba pha cùng lúc: metro số 1 đã vận hành (pha 3), Vành đai 3 đang thi công (pha 2), và các tuyến metro mở rộng còn ở giai đoạn quy hoạch (pha 1). Nghĩa là cùng một số tiền, bạn có thể chọn khẩu vị rủi ro rất khác nhau ngay trong một khu vực."
      },
      {
        "t": "q",
        "c": "Mua khi công trường đang chạy. Chốt lời khi mặt bằng giá mới được cả thị trường công nhận."
      },
      {
        "t": "h",
        "c": "Dấu hiệu một vùng giá đã nóng"
      },
      {
        "t": "ul",
        "c": [
          "Giao dịch thứ cấp chững lại nhưng giá chào vẫn tăng — người bán neo kỳ vọng, người mua không theo",
          "Tiền chênh giữ chỗ cao bất thường so với giá trị hợp đồng",
          "Câu chuyện tăng giá chỉ còn dựa vào một tin quy hoạch duy nhất"
        ]
      },
      {
        "t": "p",
        "c": "Khi cả ba dấu hiệu cùng xuất hiện, PaceLand thường khuyên khách dừng lại quan sát — cơ hội tốt tiếp theo luôn xuất hiện với người còn tiền trong tay. Kỷ luật với chu kỳ quan trọng hơn dự đoán chính xác đỉnh đáy."
      }
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
      {
        "t": "p",
        "c": "Trong các đợt thị trường điều chỉnh, Thảo Điền – An Phú luôn nằm trong nhóm giảm ít nhất và phục hồi sớm nhất Khu Đông. Lý do không nằm ở bản đồ quy hoạch, mà ở thứ khó sao chép hơn nhiều: một hệ sinh thái sống đã hoàn chỉnh."
      },
      {
        "t": "h",
        "c": "Cộng đồng là hào kinh tế"
      },
      {
        "t": "p",
        "c": "Trường quốc tế, phòng khám chuẩn quốc tế, chuỗi ẩm thực ven sông và một cộng đồng cư dân nước ngoài đông đảo tạo thành vòng xoáy tự củng cố: người nước ngoài mới đến chọn nơi có sẵn cộng đồng, dịch vụ mở thêm để phục vụ họ, và giá trị khu vực tiếp tục được bồi đắp. Vòng xoáy này cần cả thập kỷ để hình thành — đối thủ không thể xây bằng tiền trong vài năm."
      },
      {
        "t": "p",
        "c": "Nguồn cầu thuê từ chuyên gia nước ngoài giúp căn hộ khu này duy trì tỷ lệ lấp đầy cao và giá thuê ổn định ngay cả khi thị trường mua bán trầm lắng — tấm đệm dòng tiền mà ít khu vực nào có."
      },
      {
        "t": "h",
        "c": "Nguồn cung mới: ít và đắt"
      },
      {
        "t": "p",
        "c": "Quỹ đất trống gần như cạn. Số dự án mới đếm trên đầu ngón tay — Eaton Park trên mặt tiền Mai Chí Thọ là một trong số hiếm hoi — và đều định vị ở phân khúc cao. Nguồn cung khan trong khi cầu ở thực bền là công thức giữ giá kinh điển."
      },
      {
        "t": "q",
        "c": "Người ta có thể sao chép một toà nhà, nhưng không thể sao chép một cộng đồng."
      },
      {
        "t": "p",
        "c": "Điểm cần thẩm định kỹ khi mua tại đây: hiện trạng ngập cục bộ ở một số tuyến nội khu, chất lượng vận hành từng toà và mức chênh giá giữa các dự án cùng vị trí. Trả đúng giá cho đúng toà — đó là lúc dữ liệu giao dịch thực tế của PaceLand phát huy tác dụng."
      }
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
      {
        "t": "p",
        "c": "Vành đai 3 — khởi công giữa năm 2023 và đang dần hoàn thiện từng đoạn — không đơn thuần là một con đường. Nó là công cụ tái phân bố dân cư và việc làm của cả vùng TP.HCM mở rộng: kết nối Bình Dương, Đồng Nai, Long An vào một vòng tròn giao thương liền mạch."
      },
      {
        "t": "h",
        "c": "Hiệu ứng kéo giãn"
      },
      {
        "t": "p",
        "c": "Mỗi vành đai hoàn thành đều tạo ra một đợt “kéo giãn” đô thị: cư dân chấp nhận ở xa trung tâm hơn khi thời gian di chuyển giảm. Quỹ đất quanh các nút giao trở thành điểm rơi của dòng tiền — nơi đô thị mới, kho vận và thương mại dịch vụ mọc lên trước tiên."
      },
      {
        "t": "p",
        "c": "Tại phía Đông, hành lang hưởng lợi trực tiếp là dải cửa ngõ Đông Bắc — nơi Vành đai 3 giao cắt các trục hướng tâm. Các dự án đón đầu như Gladia Heights nằm trong nhóm này: mặt bằng giá còn mềm so với lõi Khu Đông, trong khi khoảng cách thời gian về trung tâm đang được rút ngắn từng quý."
      },
      {
        "t": "q",
        "c": "Hạ tầng không làm đất đẻ ra tiền — nó làm khoảng cách ngắn lại, và giá trị dịch chuyển theo."
      },
      {
        "t": "h",
        "c": "Ba câu hỏi trước khi mua theo vành đai"
      },
      {
        "t": "ul",
        "c": [
          "Đoạn tuyến đi qua khu vực đã thi công đến đâu — kỳ vọng phải bám tiến độ thật, không bám bản vẽ",
          "Pháp lý khu đất có sạch không, có nằm trong ranh dự án hạ tầng hay hành lang an toàn không",
          "Nếu tiến độ chậm 2–3 năm, phương án của bạn là gì — cho thuê được không, dòng tiền chịu được không"
        ]
      },
      {
        "t": "p",
        "c": "Mua theo hạ tầng là chiến lược đúng — với điều kiện có biên an toàn. PaceLand thẩm định tiến độ thực địa và pháp lý từng khu đất trước khi khuyến nghị, vì bản đồ quy hoạch và công trường ngoài đời không phải lúc nào cũng trùng nhau."
      }
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
      {
        "t": "p",
        "c": "Hãy bắt đầu bằng sự thật ít người quảng cáo nói ra: với mặt bằng giá hiện tại, lợi suất cho thuê gộp của căn hộ TP.HCM phổ biến ở mức 3–5%/năm — thấp hơn lãi suất vay. Nghĩa là nếu vay quá nửa giá trị căn hộ, dòng tiền hằng tháng của bạn gần như chắc chắn âm."
      },
      {
        "t": "p",
        "c": "Ví dụ minh hoạ: căn hộ 5 tỉ, cho thuê 25 triệu/tháng, vay 2,5 tỉ trong 20 năm — sau khi trừ tiền trả ngân hàng và chi phí vận hành, dòng tiền ròng âm khoảng vài triệu mỗi tháng. Bạn có thể tự kiểm tra con số của riêng mình bằng <a href='cong-cu.html#dong-tien'>công cụ dòng tiền cho thuê</a> của PaceLand."
      },
      {
        "t": "h",
        "c": "Vậy tại sao người ta vẫn mua?"
      },
      {
        "t": "p",
        "c": "Vì tổng lợi nhuận của bất động sản cho thuê = dòng tiền + tăng giá. Dòng tiền âm nhẹ có thể chấp nhận được nếu kỳ vọng tăng giá đủ lớn và chắc chắn. Vấn đề chỉ nảy sinh khi người mua nhầm một tài sản tăng trưởng thành tài sản dòng tiền — và vỡ kế hoạch tài chính vì khoản bù hằng tháng."
      },
      {
        "t": "h",
        "c": "Lời giải thực tế ở Khu Đông"
      },
      {
        "t": "ul",
        "c": [
          "Chọn nơi có cầu thuê thật: quanh khu Công nghệ cao, Đại học Quốc gia và các đại đô thị đã đông dân như Vinhomes Grand Park",
          "Giữ tỷ lệ vay dưới 40–50% nếu mục tiêu là dòng tiền dương",
          "Ưu tiên căn 1–2 phòng ngủ, nội thất chuẩn cho thuê — tối ưu lợi suất trên mỗi đồng vốn",
          "Tính đủ chi phí: phí quản lý, bảo trì, thời gian trống giữa hai đợt khách"
        ]
      },
      {
        "t": "q",
        "c": "Dòng tiền âm không phải sai lầm — không biết trước nó sẽ âm mới là sai lầm."
      },
      {
        "t": "p",
        "c": "PaceLand đang giữ một số căn có sẵn hợp đồng thuê tại Khu Đông — dòng tiền chạy ngay từ ngày nhận nhà. Đó là điểm khởi đầu an toàn cho nhà đầu tư ưu tiên sự chắc chắn."
      }
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
      {
        "t": "p",
        "c": "Phần lớn rủi ro khi mua căn hộ hình thành trong tương lai không nằm ở giá, mà nằm ở pháp lý. Tin tốt: gần như mọi rủi ro pháp lý đều kiểm tra được trước khi đặt cọc — nếu bạn biết phải hỏi đúng giấy tờ nào."
      },
      {
        "t": "h",
        "c": "Danh sách kiểm tra của PaceLand"
      },
      {
        "t": "ul",
        "c": [
          "1. Quy hoạch chi tiết 1/500 và giấy phép xây dựng: dự án được duyệt xây đúng cái đang quảng cáo không",
          "2. Văn bản đủ điều kiện bán nhà ở hình thành trong tương lai của Sở Xây dựng: thiếu văn bản này, mọi “hợp đồng” chỉ là thoả thuận giữ chỗ",
          "3. Bảo lãnh ngân hàng cho nghĩa vụ bàn giao: ngân hàng nào bảo lãnh, phạm vi đến đâu",
          "4. Tiến độ thanh toán so với tiến độ xây dựng: tiền đi trước công trình quá xa là rủi ro của bạn",
          "5. Điều khoản bàn giao và chế tài chậm bàn giao: mức phạt, thời hạn, quyền chấm dứt hợp đồng",
          "6. Kinh phí bảo trì 2% và phí quản lý dự kiến: ai giữ, chuyển giao thế nào khi có ban quản trị",
          "7. Lộ trình cấp sổ hồng: nghĩa vụ tài chính về đất của chủ đầu tư đã hoàn thành chưa"
        ]
      },
      {
        "t": "q",
        "c": "Chủ đầu tư uy tín không ngại đưa giấy tờ. Sự né tránh chính là câu trả lời."
      },
      {
        "t": "p",
        "c": "Ở Khu Đông, mặt bằng pháp lý nhìn chung tốt hơn nhiều khu vực nhờ sự hiện diện của các chủ đầu tư lớn — nhưng “nhìn chung” không bảo vệ được giao dịch cụ thể của bạn. Từng dự án, từng đợt mở bán vẫn phải soi từng văn bản."
      },
      {
        "t": "p",
        "c": "Toàn bộ 7 điểm trên nằm trong quy trình thẩm định tiêu chuẩn mà cố vấn PaceLand thực hiện thay khách hàng trước mọi khuyến nghị. Bạn không cần trở thành luật sư — bạn chỉ cần một đội ngũ coi việc đọc giấy tờ là công việc hằng ngày."
      }
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
      {
        "t": "p",
        "c": "Sân bay quốc tế Long Thành giai đoạn 1 đang về đích với mục tiêu khai thác từ năm 2026. Với công suất thiết kế giai đoạn đầu 25 triệu lượt khách mỗi năm, đây là công trình hạ tầng có sức ảnh hưởng lớn nhất tới bản đồ bất động sản phía Nam trong thập kỷ này."
      },
      {
        "t": "h",
        "c": "Giá trị nằm ở trục, không nằm ở cạnh hàng rào"
      },
      {
        "t": "p",
        "c": "Ngộ nhận phổ biến nhất: “gần sân bay là tăng giá”. Thực tế các đô thị lớn cho thấy điều ngược lại — giá trị ở cạnh sân bay bị giới hạn bởi tiếng ồn và quy hoạch tĩnh không. Giá trị thật nằm dọc trục kết nối giữa sân bay và trung tâm kinh tế: nơi chuyên gia hàng không, logistics và dịch vụ chọn để sống."
      },
      {
        "t": "p",
        "c": "Trục đó chính là hành lang cao tốc TP.HCM – Long Thành – Dầu Giây đang được mở rộng, cộng hưởng với Vành đai 3 và trong tương lai là tuyến đường sắt kết nối. Khu Đông TP.HCM đứng ở đầu trục: mọi chuyến đi từ trung tâm ra sân bay đều đi xuyên qua nó."
      },
      {
        "t": "ul",
        "c": [
          "Căn hộ dọc trục Mai Chí Thọ – cao tốc: tệp thuê mới từ chuyên gia làm việc tại sân bay và các khu công nghiệp vệ tinh",
          "Khu Đông Bắc quanh nút giao vành đai: điểm rơi của kho vận, thương mại và nhà ở cho lực lượng lao động mới",
          "Bất động sản nghỉ dưỡng ven đô: hưởng lợi từ khách quốc tế trung chuyển qua Long Thành"
        ]
      },
      {
        "t": "q",
        "c": "Sân bay là nhà máy tạo việc làm — và việc làm là thứ nuôi giá bất động sản."
      },
      {
        "t": "p",
        "c": "Kịch bản đáng theo dõi nhất với nhà đầu tư Khu Đông không phải là ngày khánh thành, mà là nhịp tăng tần suất khai thác trong 2–3 năm sau đó. Dòng tiền thông minh đi trước dòng người — nhưng chỉ đi trước một bước, không đi trước một thập kỷ."
      }
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
      {
        "t": "p",
        "c": "Đầu năm 2021, TP. Thủ Đức ra đời từ việc sáp nhập ba quận phía Đông với kỳ vọng trở thành “đô thị sáng tạo tương tác cao” — cực tăng trưởng đóng góp lớn cho kinh tế thành phố, dựa trên ba trụ: khu Công nghệ cao, Đại học Quốc gia và trung tâm tài chính Thủ Thiêm."
      },
      {
        "t": "h",
        "c": "5 năm nhìn lại: cái gì chạy, cái gì chậm"
      },
      {
        "t": "p",
        "c": "Phần “cứng” đã chuyển động thật sự: metro số 1 vận hành, Vành đai 3 thành hình, nút giao An Phú và các trục chính dần hoàn thiện, các đại đô thị đông dân lên từng năm. Bộ mặt đô thị phía Đông hôm nay khác hẳn năm 2021."
      },
      {
        "t": "p",
        "c": "Phần “mềm” đi chậm hơn: bộ máy hành chính, phân cấp ngân sách và các cơ chế đặc thù cần nhiều thời gian hơn kỳ vọng ban đầu. Trung tâm tài chính Thủ Thiêm vẫn đang trong giai đoạn xây nền móng thể chế. Đây là điều bình thường — không đô thị lớn nào trên thế giới hoàn thiện trong 5 năm."
      },
      {
        "t": "q",
        "c": "Đô thị lớn không được xây trong một nhiệm kỳ. Tài sản lớn cũng vậy."
      },
      {
        "t": "h",
        "c": "Bài học cho người cầm tiền"
      },
      {
        "t": "ul",
        "c": [
          "Đặt cược vào cụm việc làm hiện hữu (khu Công nghệ cao, Đại học Quốc gia, Thủ Thiêm) thay vì lời hứa quy hoạch",
          "Ưu tiên khu vực hạ tầng đã vận hành hoặc đang thi công — kỳ vọng xa hơn cần biên giá an toàn tương xứng",
          "Chọn chủ đầu tư đủ sức đi đường dài: dự án dở dang là rủi ro lớn nhất ở các vùng đô thị hoá nhanh",
          "Kiên nhẫn với chu kỳ 5–10 năm: phần thưởng của Thủ Đức dành cho người đi dài hạn"
        ]
      },
      {
        "t": "p",
        "c": "PaceLand tin rằng chương hay nhất của TP. Thủ Đức vẫn ở phía trước — và như mọi câu chuyện tăng trưởng, phần lợi nhuận tốt nhất thuộc về những người vào vị trí trước khi câu chuyện trở nên hiển nhiên với tất cả mọi người."
      }
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
      },
      {
        "t": "p",
        "c": "Nếu anh/chị đang làm nghề và muốn chuyển từ bán giao dịch sang tư vấn tài sản, PaceLand đang mở các vị trí trong đội ngũ kinh doanh. Xem chi tiết tại <a href='/tuyen-dung.html'>trang tuyển dụng PaceLand</a>."
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
      },
      {
        "t": "p",
        "c": "Đây cũng là lộ trình PaceLand đang tuyển người đi cùng: Sales → Leader → Đối tác sở hữu. Nếu anh/chị muốn bắt đầu, xem vị trí <a href='/tuyen-dung/agent-bat-dong-san.html'>Agent bất động sản</a> hoặc toàn bộ <a href='/tuyen-dung.html'>cơ hội nghề nghiệp tại PaceLand</a>."
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
    "id": "agent-bat-dong-san",
    "status": "open",
    "sortOrder": 10,
    "featured": true,
    "title": "Chuyên viên kinh doanh bất động sản (Agent)",
    "shortTitle": "Agent",
    "count": "20",
    "category": "kinh-doanh",
    "dept": "Kinh doanh",
    "type": "Toàn thời gian",
    "location": "Văn phòng Quận 2 (P. Bình Trưng), TP.HCM",
    "salary": "Lương cứng 5 triệu + chia sẻ doanh thu lũy tiến đến 75%",
    "baseSalary": {
      "value": 5000000,
      "currency": "VND",
      "unit": "MONTH"
    },
    "experienceRequirements": "no requirements",
    "datePosted": "2026-09-19",
    "validThrough": "",
    "summary": "Bán danh mục căn hộ, nhà phố cao cấp chọn lọc với nguồn khách từ Marketing, lộ trình từ Sales lên Leader và Đối tác sở hữu.",
    "desc": "Từ Sale đến Đối tác sở hữu: bán danh mục dự án cao cấp chọn lọc tại Khu Đông với nguồn khách từ Marketing, lương cứng và cơ chế chia sẻ doanh thu lũy tiến lên đến 75%.",
    "hero": {
      "title": "Bán bất động sản. Xây sự nghiệp của riêng bạn.",
      "sub": "Marketing, dữ liệu dự án, SaleHub và danh mục sản phẩm đã được chuẩn hóa, để bạn dồn sức vào khách hàng và giao dịch."
    },
    "why": {
      "title": "Không chỉ thêm một sàn để bạn bán hàng.",
      "text": "Nhiều nơi tuyển sale bằng lời hứa hoa hồng. PaceLand xây hạ tầng bán hàng trước, rồi mới tìm người đi cùng.",
      "points": [
        {
          "title": "Khách đến từ hệ thống",
          "text": "Website paceland.vn, fanpage, TikTok, YouTube và các bài phân tích thị trường đưa khách hàng về. Bạn không bắt đầu từ con số không."
        },
        {
          "title": "Sản phẩm chọn lọc, dữ liệu sẵn",
          "text": "{{projects}} dự án có trang thông tin chuẩn hóa về pháp lý, tiến độ, giá tham khảo. Mở SaleHub là đủ dữ liệu để tư vấn."
        },
        {
          "title": "Tên tuổi của bạn được xây công khai",
          "text": "Mã chứng nhận PL-xxxx tra cứu công khai và trang hồ sơ riêng trên paceland.vn: khách kiểm chứng được bạn là ai trước khi gặp."
        }
      ]
    },
    "duties": [
      "Tư vấn khách mua căn hộ, nhà phố cao cấp theo danh mục chọn lọc",
      "Chăm sóc nguồn khách từ Marketing và phát triển tệp khách riêng",
      "Dẫn khách tham quan nhà mẫu, công trường; đàm phán và chốt giao dịch",
      "Cập nhật giỏ hàng, chính sách bán hàng theo từng đợt mở bán",
      "Xây dựng thương hiệu cá nhân với mã chứng nhận PaceLand riêng"
    ],
    "profiles": [
      {
        "title": "Người mới vào nghề",
        "text": "Chưa từng bán bất động sản? Bạn bắt đầu bằng đào tạo hội nhập, cùng dữ liệu dự án và công cụ tư vấn có sẵn. Kinh nghiệm sales ở ngành khác là lợi thế, không phải điều kiện."
      },
      {
        "title": "Sale đang ở sàn khác",
        "text": "Mang kinh nghiệm của bạn vào một hệ thống có nguồn khách từ Marketing, danh mục chọn lọc và chia sẻ doanh thu lũy tiến lên đến 75%."
      },
      {
        "title": "Người đã có kết quả",
        "text": "Bạn cần nhiều hơn một nơi trả hoa hồng: lộ trình lên Leader để xây đội của riêng mình, hồ sơ chứng nhận công khai và con đường tới Đối tác sở hữu."
      }
    ],
    "reqs": [
      "Giao tiếp tốt, tạo được niềm tin với khách hàng",
      "Chủ động, kỷ luật, cam kết với mục tiêu của chính mình",
      "Sẵn sàng học sản phẩm, pháp lý và thị trường Khu Đông",
      "Ưu tiên từng làm sales (BĐS, bảo hiểm, ô tô, tài chính); chưa có kinh nghiệm vẫn được xem xét"
    ],
    "kpis": [],
    "compensation": [
      {
        "label": "Lương cứng",
        "value": "5 triệu/tháng",
        "note": ""
      },
      {
        "label": "Chia sẻ doanh thu",
        "value": "Lên đến 75%",
        "note": "Cơ chế lũy tiến theo năng lực và kết quả"
      },
      {
        "label": "Nguồn khách",
        "value": "Từ Marketing",
        "note": "Hỗ trợ khách hàng từ Marketing toàn diện"
      }
    ],
    "benefits": [
      "Lương cứng 5 triệu + chia sẻ doanh thu lũy tiến lên đến 75%",
      "Nguồn khách hàng từ Marketing toàn diện",
      "Kho sản phẩm cao cấp, thanh khoản tốt",
      "Hệ thống đào tạo, dữ liệu và cổng làm việc SaleHub",
      "Lộ trình Sales → Leader → Đối tác sở hữu",
      "Mã chứng nhận + trang hồ sơ cá nhân trên paceland.vn"
    ],
    "system": [
      "marketing",
      "du-an",
      "salehub",
      "cong-cu",
      "thuong-hieu",
      "dao-tao"
    ],
    "pathStage": "sales",
    "showProducts": true,
    "environment": [
      "Văn phòng: {{address}}",
      "Gần các dự án Khu Đông PaceLand đang phân phối: Nam Rạch Chiếc, An Phú, Thủ Thiêm"
    ],
    "faq": [
      {
        "q": "Chưa có kinh nghiệm bất động sản, tôi có ứng tuyển Agent được không?",
        "a": "Được. PaceLand có hệ thống đào tạo và dữ liệu để người mới bắt đầu. Ứng viên từng làm sales (bất động sản, bảo hiểm, ô tô, tài chính) được ưu tiên, nhưng đây không phải điều kiện bắt buộc."
      },
      {
        "q": "Thu nhập của Agent PaceLand gồm những gì?",
        "a": "Gồm lương cứng 5 triệu đồng/tháng và chia sẻ doanh thu theo cơ chế lũy tiến, tối đa đến 75%. Tỷ lệ cụ thể phụ thuộc năng lực và kết quả, được trao đổi rõ trong buổi phỏng vấn."
      },
      {
        "q": "Agent có được hỗ trợ nguồn khách không?",
        "a": "Có. Theo chính sách tuyển dụng, PaceLand hỗ trợ khách hàng từ Marketing: website paceland.vn với {{projects}} trang dự án, {{posts}} bài phân tích thị trường cùng kênh Facebook, TikTok, YouTube. Agent vẫn được khuyến khích xây tệp khách riêng."
      },
      {
        "q": "Agent PaceLand làm việc ở đâu?",
        "a": "Tại văn phòng PaceLand ở Quận 2 cũ: {{address}}, gần các dự án Khu Đông đang phân phối."
      },
      {
        "q": "Lộ trình phát triển của Agent ra sao?",
        "a": "Lộ trình gồm 3 bậc: Sales (Agent) → Leader → Đối tác sở hữu. Việc lên bậc dựa trên năng lực và kết quả theo cơ chế lũy tiến; điều kiện cụ thể của từng bậc được trao đổi trực tiếp khi phỏng vấn."
      },
      {
        "q": "Ứng tuyển Agent cần chuẩn bị gì?",
        "a": "Chỉ cần họ tên, số điện thoại và vị trí. CV không bắt buộc ở bước đầu; nếu có, anh/chị gửi kèm link CV hoặc LinkedIn."
      }
    ],
    "finalCta": {
      "title": "Bạn không cần chờ đến khi “đủ giỏi”.",
      "sub": "Nếu muốn nghiêm túc xây sự nghiệp bất động sản, hãy bắt đầu bằng một cuộc trao đổi.",
      "button": "Ứng tuyển Agent"
    },
    "poster": "assets/img/tuyen-dung/agent.jpg",
    "ogImage": "assets/img/tuyen-dung/og-agent-bat-dong-san.jpg",
    "seoTitle": "Tuyển 20 nhân viên kinh doanh BĐS (Agent) Quận 2 | PaceLand",
    "seoDescription": "PaceLand tuyển 20 Agent kinh doanh bất động sản tại Quận 2: lương cứng 5 triệu/tháng, chia sẻ doanh thu đến 75%, khách từ Marketing, nhận cả người mới.",
    "stories": []
  },
  {
    "id": "giam-doc-kinh-doanh",
    "status": "open",
    "sortOrder": 20,
    "featured": true,
    "title": "Giám đốc Kinh doanh",
    "shortTitle": "Giám đốc Kinh doanh",
    "count": "02",
    "category": "lanh-dao",
    "dept": "Kinh doanh",
    "type": "Toàn thời gian",
    "location": "Văn phòng Quận 2 (P. Bình Trưng), TP.HCM",
    "salary": "Thỏa thuận + chia sẻ doanh thu đội nhóm",
    "datePosted": "2026-09-19",
    "validThrough": "",
    "summary": "Chủ động xây và dẫn dắt đội kinh doanh bất động sản cao cấp, với Marketing và vận hành hỗ trợ phía sau.",
    "desc": "Dẫn dắt đội ngũ, chia sẻ thành quả: chủ động xây dựng và vận hành đội kinh doanh bất động sản cao cấp tại Khu Đông TP.HCM với cơ chế rõ ràng, nguồn lực marketing và vận hành đồng bộ.",
    "hero": {
      "title": "Dẫn dắt đội ngũ. Chia sẻ thành quả.",
      "sub": "Quyền chủ động xây team, Marketing và vận hành hỗ trợ phía sau, cơ chế kinh doanh rõ ràng, để bạn tập trung vào con người và kết quả."
    },
    "why": {
      "title": "Vì sao PaceLand cần vị trí này",
      "text": "PaceLand đang mở rộng đội kinh doanh tại Khu Đông với {{agentCount}} vị trí Agent mới. Mỗi đội cần một người dẫn dắt có kết quả thật và muốn xây sự nghiệp quản lý của riêng mình.",
      "points": [
        {
          "title": "Quyền chủ động xây team",
          "text": "Bạn tuyển chọn và phát triển đội ngũ Agent theo định biên của mình."
        },
        {
          "title": "Hỗ trợ Marketing & vận hành",
          "text": "Nguồn khách, nội dung, dữ liệu dự án và admin kinh doanh đi cùng đội của bạn."
        },
        {
          "title": "Cơ chế kinh doanh rõ ràng",
          "text": "Chia sẻ doanh thu đội nhóm theo cơ chế lũy tiến, trao đổi minh bạch ngay từ buổi phỏng vấn."
        }
      ]
    },
    "duties": [
      "Tuyển chọn và xây dựng đội ngũ Agent theo định biên riêng",
      "Hoạch định mục tiêu doanh số, chiến lược bán theo từng dự án",
      "Đào tạo, kèm cặp đội ngũ và duyệt phương án tư vấn quan trọng",
      "Phối hợp Marketing khai thác nguồn khách, phát triển tệp khách riêng",
      "Báo cáo kết quả trực tiếp với Ban lãnh đạo"
    ],
    "profiles": [],
    "reqs": [
      "Kinh nghiệm quản lý đội nhóm kinh doanh bất động sản, ưu tiên phân khúc cao cấp",
      "Thành tích bán hàng chứng minh được bằng con số",
      "Kỹ năng tuyển dụng, đào tạo và tạo động lực cho đội ngũ",
      "Tư duy dữ liệu, làm việc minh bạch theo cơ chế"
    ],
    "kpis": [],
    "compensation": [
      {
        "label": "Thu nhập",
        "value": "Thỏa thuận",
        "note": "Trao đổi cụ thể khi phỏng vấn"
      },
      {
        "label": "Chia sẻ doanh thu",
        "value": "Theo đội nhóm",
        "note": "Cơ chế lũy tiến"
      }
    ],
    "benefits": [
      "Quyền chủ động xây team",
      "Chia sẻ doanh thu đội nhóm, cơ chế lũy tiến minh bạch",
      "Hỗ trợ Marketing & vận hành toàn diện",
      "Lộ trình phát triển lên Đối tác sở hữu",
      "Văn phòng hiện đại tại Quận 2"
    ],
    "system": [
      "marketing",
      "du-an",
      "salehub",
      "thuong-hieu",
      "dao-tao"
    ],
    "pathStage": "leader",
    "showProducts": true,
    "environment": [
      "Văn phòng: {{address}}",
      "Làm việc trực tiếp với Ban lãnh đạo PaceLand"
    ],
    "faq": [
      {
        "q": "Vị trí Giám đốc Kinh doanh làm việc ở đâu?",
        "a": "Tại văn phòng PaceLand ở Quận 2 cũ: {{address}}. Đây là khu vực gần các dự án Khu Đông mà PaceLand đang phân phối."
      },
      {
        "q": "Thu nhập Giám đốc Kinh doanh được tính thế nào?",
        "a": "Gồm thu nhập thỏa thuận và chia sẻ doanh thu đội nhóm theo cơ chế lũy tiến. Con số cụ thể được trao đổi trực tiếp trong buổi phỏng vấn."
      },
      {
        "q": "Giám đốc Kinh doanh có được tự xây đội không?",
        "a": "Có. Vị trí này có quyền chủ động tuyển chọn và xây dựng đội ngũ Agent theo định biên riêng."
      },
      {
        "q": "Ứng tuyển Giám đốc Kinh doanh cần chuẩn bị gì?",
        "a": "Họ tên, số điện thoại và vị trí. Nên gửi kèm link hồ sơ (CV, LinkedIn) và kết quả kinh doanh gần nhất để buổi trao đổi đi vào thực chất."
      }
    ],
    "finalCta": {
      "title": "Sẵn sàng dẫn dắt một đội của riêng mình?",
      "sub": "Gửi thông tin, Ban lãnh đạo PaceLand trao đổi trực tiếp với bạn về cơ chế và kế hoạch.",
      "button": "Ứng tuyển Giám đốc Kinh doanh"
    },
    "poster": "assets/img/tuyen-dung/giam-doc-kinh-doanh.jpg",
    "ogImage": "assets/img/tuyen-dung/og-giam-doc-kinh-doanh.jpg",
    "seoTitle": "Tuyển Giám đốc Kinh doanh bất động sản Quận 2 | PaceLand",
    "seoDescription": "PaceLand tuyển 02 Giám đốc Kinh doanh bất động sản cao cấp tại Quận 2: chủ động xây đội, có Marketing và vận hành hỗ trợ, chia sẻ doanh thu đội nhóm lũy tiến.",
    "stories": []
  },
  {
    "id": "digital-marketing",
    "status": "open",
    "sortOrder": 30,
    "featured": false,
    "title": "Digital Marketing",
    "shortTitle": "Digital Marketing",
    "count": "01",
    "category": "marketing",
    "dept": "Tiếp thị & Công nghệ",
    "type": "Toàn thời gian",
    "location": "Văn phòng Quận 2 (P. Bình Trưng), TP.HCM",
    "salary": "Thỏa thuận theo năng lực",
    "datePosted": "2026-09-19",
    "validThrough": "",
    "summary": "Vận hành performance ads, landing page, CRM và analytics, biến dữ liệu thành khách hàng cho đội kinh doanh.",
    "desc": "Biến dữ liệu thành khách hàng: vận hành performance ads, landing page, CRM và automation cho toàn bộ phễu khách hàng bất động sản cao cấp của PaceLand.",
    "hero": {
      "title": "Biến dữ liệu thành khách hàng.",
      "sub": "Performance Ads, landing page, CRM, automation và analytics cho phễu khách hàng bất động sản cao cấp của PaceLand."
    },
    "why": {
      "title": "Vì sao PaceLand cần vị trí này",
      "text": "Đội kinh doanh đang tuyển thêm {{agentCount}} Agent. Nguồn khách chất lượng, đo được đến từng kênh, là thứ giữ cho cả hệ thống chạy.",
      "points": [
        {
          "title": "Hạ tầng đã có",
          "text": "Website paceland.vn, landing page dự án và form thu lead gắn UTM đang chạy."
        },
        {
          "title": "Kênh sẵn sàng",
          "text": "Fanpage, TikTok, YouTube và kho {{posts}} bài phân tích thị trường."
        },
        {
          "title": "Bài toán rõ ràng",
          "text": "Chi phí trên mỗi khách hàng tiềm năng và chất lượng lead cho đội Agent."
        }
      ]
    },
    "duties": [
      "Lên kế hoạch và chạy performance ads (Meta, Google) cho từng dự án",
      "Xây dựng, tối ưu landing page và đo lường chuyển đổi",
      "Quản trị CRM, automation nuôi dưỡng khách hàng tiềm năng",
      "Phân tích số liệu, tối ưu chi phí trên mỗi khách hàng theo tuần",
      "Phối hợp Media Marketing sản xuất nội dung quảng cáo"
    ],
    "profiles": [],
    "reqs": [
      "Kinh nghiệm chạy performance ads có số liệu chứng minh",
      "Hiểu landing page, tracking, CRM và automation",
      "Tư duy phân tích, ra quyết định bằng dữ liệu",
      "Ưu tiên từng làm bất động sản hoặc ngành hàng giá trị cao"
    ],
    "kpis": [],
    "compensation": [
      {
        "label": "Thu nhập",
        "value": "Thỏa thuận",
        "note": "Theo năng lực và kinh nghiệm"
      }
    ],
    "benefits": [
      "Làm việc trực tiếp trên website, landing page và dữ liệu lead của PaceLand",
      "Làm việc cùng đội kinh doanh để đo chất lượng lead",
      "Thu nhập thỏa thuận theo năng lực",
      "Văn phòng hiện đại tại Quận 2"
    ],
    "system": [
      "marketing",
      "du-an",
      "salehub"
    ],
    "pathStage": "",
    "showProducts": false,
    "environment": [
      "Văn phòng: {{address}}",
      "Làm việc cùng Media Marketing và đội kinh doanh"
    ],
    "faq": [
      {
        "q": "Vị trí Digital Marketing làm việc ở đâu?",
        "a": "Tại văn phòng PaceLand ở Quận 2 cũ: {{address}}. Đây là khu vực gần các dự án Khu Đông mà PaceLand đang phân phối."
      },
      {
        "q": "Ứng tuyển Digital Marketing cần gửi gì?",
        "a": "Họ tên, số điện thoại và vị trí. Nên gửi kèm link hồ sơ hoặc số liệu các chiến dịch bạn từng chạy."
      },
      {
        "q": "Thu nhập Digital Marketing thế nào?",
        "a": "Thỏa thuận theo năng lực và kinh nghiệm, trao đổi cụ thể khi phỏng vấn."
      }
    ],
    "finalCta": {
      "title": "Bạn thích nhìn số liệu biến thành khách hàng thật?",
      "sub": "Gửi thông tin kèm vài con số bạn tự hào nhất, chúng ta bắt đầu từ đó.",
      "button": "Ứng tuyển Digital Marketing"
    },
    "poster": "assets/img/tuyen-dung/digital-marketing.jpg",
    "ogImage": "assets/img/tuyen-dung/og-digital-marketing.jpg",
    "seoTitle": "Tuyển Digital Marketing bất động sản Quận 2 | PaceLand",
    "seoDescription": "PaceLand tuyển 01 Digital Marketing bất động sản tại Quận 2: performance ads, landing page, CRM, automation, analytics. Thu nhập thỏa thuận theo năng lực.",
    "stories": []
  },
  {
    "id": "media-marketing",
    "status": "open",
    "sortOrder": 40,
    "featured": false,
    "title": "Media Marketing",
    "shortTitle": "Media Marketing",
    "count": "01",
    "category": "marketing",
    "dept": "Tiếp thị & Công nghệ",
    "type": "Toàn thời gian",
    "location": "Văn phòng Quận 2 (P. Bình Trưng), TP.HCM",
    "salary": "Thỏa thuận theo năng lực",
    "datePosted": "2026-09-19",
    "validThrough": "",
    "summary": "Sản xuất photo, video, reels và nội dung dự án, biến dự án cao cấp thành nội dung có sức nặng.",
    "desc": "Biến dự án thành nội dung có sức nặng: sản xuất photo, video, reels và project content cho thương hiệu PaceLand cùng danh mục dự án cao cấp.",
    "hero": {
      "title": "Biến dự án thành nội dung có sức nặng.",
      "sub": "Photo, video, reels và project content cho thương hiệu PaceLand cùng danh mục {{projects}} dự án cao cấp."
    },
    "why": {
      "title": "Vì sao PaceLand cần vị trí này",
      "text": "Khách hàng cao cấp muốn tin trước khi gặp. Hình ảnh và video đủ chuẩn là điểm bắt đầu của cả phễu bán hàng.",
      "points": [
        {
          "title": "Bối cảnh cao cấp",
          "text": "Nhà mẫu, công trường và tiện ích của các dự án PaceLand đang phân phối."
        },
        {
          "title": "Kênh phân phối sẵn",
          "text": "Website, fanpage, TikTok và YouTube của PaceLand."
        }
      ]
    },
    "duties": [
      "Quay, dựng video và reels về dự án và hoạt động đội ngũ",
      "Chụp và xử lý ảnh dự án, nhà mẫu, sự kiện",
      "Xây kịch bản nội dung ngắn cho TikTok, Facebook, YouTube",
      "Quản lý kho media, giữ đồng bộ nhận diện thương hiệu",
      "Phối hợp Digital Marketing tối ưu nội dung theo số liệu"
    ],
    "profiles": [],
    "reqs": [
      "Thành thạo quay dựng (Premiere, CapCut…) và chụp ảnh",
      "Có portfolio sản phẩm thực tế",
      "Thẩm mỹ tốt, bắt xu hướng nhanh",
      "Ưu tiên hiểu bất động sản hoặc nội dung phân khúc cao cấp"
    ],
    "kpis": [],
    "compensation": [
      {
        "label": "Thu nhập",
        "value": "Thỏa thuận",
        "note": "Theo năng lực và portfolio"
      }
    ],
    "benefits": [
      "Bối cảnh là các dự án cao cấp PaceLand đang phân phối",
      "Kênh phân phối sẵn: website, TikTok, YouTube, Facebook",
      "Thu nhập thỏa thuận theo năng lực",
      "Văn phòng hiện đại tại Quận 2"
    ],
    "system": [
      "marketing",
      "du-an"
    ],
    "pathStage": "",
    "showProducts": true,
    "environment": [
      "Văn phòng: {{address}}",
      "Làm việc cùng Digital Marketing và đội kinh doanh"
    ],
    "faq": [
      {
        "q": "Vị trí Media Marketing làm việc ở đâu?",
        "a": "Tại văn phòng PaceLand ở Quận 2 cũ: {{address}}. Đây là khu vực gần các dự án Khu Đông mà PaceLand đang phân phối."
      },
      {
        "q": "Ứng tuyển Media Marketing có cần portfolio không?",
        "a": "Nên có. Link portfolio (Drive, YouTube, TikTok…) giúp PaceLand đánh giá nhanh và công bằng hơn; CV không bắt buộc ở bước đầu."
      },
      {
        "q": "Thu nhập Media Marketing thế nào?",
        "a": "Thỏa thuận theo năng lực và portfolio, trao đổi cụ thể khi phỏng vấn."
      }
    ],
    "finalCta": {
      "title": "Portfolio của bạn là lời giới thiệu tốt nhất.",
      "sub": "Gửi link sản phẩm bạn tự hào, chúng ta nói chuyện tiếp từ đó.",
      "button": "Ứng tuyển Media Marketing"
    },
    "poster": "assets/img/tuyen-dung/media-marketing.jpg",
    "ogImage": "assets/img/tuyen-dung/og-media-marketing.jpg",
    "seoTitle": "Tuyển Media Marketing (video, ảnh) BĐS Quận 2 | PaceLand",
    "seoDescription": "PaceLand tuyển 01 Media Marketing tại Quận 2: quay dựng video, reels, chụp ảnh và nội dung cho dự án bất động sản cao cấp. Thu nhập thỏa thuận theo năng lực.",
    "stories": []
  },
  {
    "id": "admin-kinh-doanh",
    "status": "open",
    "sortOrder": 50,
    "featured": false,
    "title": "Admin Kinh doanh",
    "shortTitle": "Admin Kinh doanh",
    "count": "02",
    "category": "van-hanh",
    "dept": "Kinh doanh",
    "type": "Toàn thời gian",
    "location": "Văn phòng Quận 2 (P. Bình Trưng), TP.HCM",
    "salary": "Thỏa thuận theo năng lực",
    "datePosted": "2026-09-19",
    "validThrough": "",
    "summary": "Đầu mối booking, hồ sơ, dữ liệu và báo cáo, giữ nhịp vận hành cho đội kinh doanh.",
    "desc": "Giữ nhịp vận hành, nâng tốc đội ngũ: đầu mối booking, hồ sơ, dữ liệu và báo cáo giúp bộ máy kinh doanh chạy gọn, rõ, chuyên nghiệp.",
    "hero": {
      "title": "Giữ nhịp vận hành. Nâng tốc đội ngũ.",
      "sub": "Booking, hồ sơ, dữ liệu, báo cáo: bạn là người giúp bộ máy kinh doanh chạy gọn, rõ và chuyên nghiệp."
    },
    "why": {
      "title": "Vì sao PaceLand cần vị trí này",
      "text": "Khi đội kinh doanh mở rộng thêm {{agentCount}} Agent, mỗi giao dịch cần hồ sơ đúng, dữ liệu sạch và báo cáo kịp thời. Admin kinh doanh là người giữ những điều đó.",
      "points": [
        {
          "title": "Môi trường gọn, rõ",
          "text": "Quy trình và dữ liệu dự án được chuẩn hóa tập trung."
        },
        {
          "title": "Ở trung tâm đội kinh doanh",
          "text": "Theo sát từng booking đến khi ký hợp đồng."
        }
      ]
    },
    "duties": [
      "Quản lý booking giao dịch, lịch hẹn và hồ sơ khách hàng",
      "Theo dõi dữ liệu giỏ hàng, cập nhật trạng thái căn theo từng dự án",
      "Chuẩn bị hợp đồng, đối soát chứng từ với chủ đầu tư",
      "Tổng hợp báo cáo kinh doanh định kỳ cho Ban lãnh đạo",
      "Hỗ trợ vận hành văn phòng và các sự kiện bán hàng"
    ],
    "profiles": [],
    "reqs": [
      "Cẩn thận, chi tiết, kỷ luật với số liệu",
      "Thành thạo Excel / Google Sheets",
      "Giao tiếp tốt, phối hợp nhịp nhàng nhiều bộ phận",
      "Ưu tiên từng làm admin hoặc trợ lý kinh doanh bất động sản"
    ],
    "kpis": [],
    "compensation": [
      {
        "label": "Thu nhập",
        "value": "Thỏa thuận",
        "note": "Theo năng lực và kinh nghiệm"
      }
    ],
    "benefits": [
      "Môi trường làm việc gọn, rõ, chuyên nghiệp",
      "Dữ liệu dự án và quy trình được chuẩn hóa tập trung",
      "Thu nhập thỏa thuận theo năng lực",
      "Văn phòng hiện đại tại Quận 2"
    ],
    "system": [
      "du-an",
      "salehub"
    ],
    "pathStage": "",
    "showProducts": false,
    "environment": [
      "Văn phòng: {{address}}",
      "Làm việc cùng đội kinh doanh và Ban lãnh đạo"
    ],
    "faq": [
      {
        "q": "Vị trí Admin Kinh doanh làm việc ở đâu?",
        "a": "Tại văn phòng PaceLand ở Quận 2 cũ: {{address}}. Đây là khu vực gần các dự án Khu Đông mà PaceLand đang phân phối."
      },
      {
        "q": "Admin kinh doanh cần kỹ năng gì?",
        "a": "Cẩn thận với số liệu, thành thạo Excel hoặc Google Sheets và phối hợp tốt với nhiều bộ phận. Từng làm admin hoặc trợ lý kinh doanh bất động sản là lợi thế."
      },
      {
        "q": "Thu nhập Admin kinh doanh thế nào?",
        "a": "Thỏa thuận theo năng lực và kinh nghiệm, trao đổi cụ thể khi phỏng vấn."
      }
    ],
    "finalCta": {
      "title": "Bạn là người giữ cho mọi thứ đúng chỗ?",
      "sub": "Gửi thông tin, PaceLand trao đổi với bạn về công việc cụ thể.",
      "button": "Ứng tuyển Admin Kinh doanh"
    },
    "poster": "assets/img/tuyen-dung/admin-kinh-doanh.jpg",
    "ogImage": "assets/img/tuyen-dung/og-admin-kinh-doanh.jpg",
    "seoTitle": "Tuyển Admin Kinh doanh bất động sản Quận 2 | PaceLand",
    "seoDescription": "PaceLand tuyển 02 Admin Kinh doanh tại Quận 2: booking, hồ sơ, dữ liệu và báo cáo cho đội kinh doanh bất động sản cao cấp. Thu nhập thỏa thuận theo năng lực.",
    "stories": []
  }
];

const CAREERS = {
  "locationShort": "Quận 2, TP.HCM",
  "hero": {
    "h1": "Tuyển dụng PaceLand: {{openings}} vị trí bất động sản tại {{locShort}}",
    "eyebrow": "PaceLand Careers",
    "title": "Xây sự nghiệp.",
    "titleAccent": "Không chỉ tìm việc.",
    "sub": "Đang tuyển {{jobsList}}. Agent nhận {{agentSalary}}, có nguồn khách từ Marketing và được đào tạo từ đầu.",
    "primaryCta": "Ứng tuyển ngay",
    "secondaryCta": "Xem vị trí đang tuyển"
  },
  "facts": [
    {
      "value": "{{openings}}",
      "label": "vị trí đang tuyển",
      "note": "{{roles}} vai trò"
    },
    {
      "value": "{{agentBase}}",
      "label": "lương cứng mỗi tháng",
      "note": "Agent, cộng chia sẻ doanh thu"
    },
    {
      "value": "75%",
      "label": "chia sẻ doanh thu tối đa",
      "note": "Agent, lũy tiến theo kết quả"
    },
    {
      "value": "Quận 2",
      "label": "văn phòng làm việc",
      "note": "Khu Đông TP.HCM"
    }
  ],
  "midCta": {
    "title": "Thấy mình phù hợp?",
    "jobTitle": "Vị trí này hợp với bạn?",
    "sub": "Chỉ cần họ tên, số điện thoại và vị trí. Không cần CV ở bước đầu.",
    "button": "Ứng tuyển ngay"
  },
  "story": {
    "title": "Đừng chỉ tìm một sàn để bán hàng.",
    "sub": "Hãy xây một sự nghiệp bất động sản thuộc về mình.",
    "steps": [
      {
        "kicker": "Client base",
        "title": "Xây tệp khách hàng",
        "text": "Khách từ Marketing, khách giới thiệu và khách của chính bạn cộng dồn qua từng năm."
      },
      {
        "kicker": "Personal brand",
        "title": "Xây thương hiệu cá nhân",
        "text": "Mã chứng nhận và trang hồ sơ trên paceland.vn giúp khách kiểm chứng bạn là ai."
      },
      {
        "kicker": "Income",
        "title": "Tăng thu nhập theo năng lực",
        "text": "Chia sẻ doanh thu lũy tiến lên đến 75%: kết quả càng tốt, tỷ lệ càng cao."
      },
      {
        "kicker": "Team",
        "title": "Xây đội nhóm",
        "text": "Đủ kết quả, bạn lên Leader và dẫn dắt đội của mình."
      },
      {
        "kicker": "Ownership",
        "title": "Tiến tới quyền sở hữu",
        "text": "Đích đến của lộ trình là Đối tác sở hữu, theo chính sách của PaceLand."
      }
    ]
  },
  "ecosystem": {
    "title": "Bạn không phải tự bơi.",
    "sub": "Bạn tập trung vào khách hàng và giao dịch. Hệ thống phía sau lo phần còn lại.",
    "modules": [
      {
        "id": "marketing",
        "title": "Marketing & nội dung",
        "text": "Website, fanpage, TikTok, YouTube và {{posts}} bài phân tích thị trường đưa khách hàng về.",
        "href": "/goc-nhin.html",
        "link": "Xem nội dung"
      },
      {
        "id": "du-an",
        "title": "Dữ liệu dự án",
        "text": "{{projects}} dự án có trang thông tin chuẩn hóa: pháp lý, tiến độ, giá tham khảo, câu hỏi thường gặp.",
        "href": "/du-an.html",
        "link": "Xem dự án"
      },
      {
        "id": "salehub",
        "title": "SaleHub",
        "text": "Cổng làm việc một trang: dự án, công cụ tính và bài gửi khách, mở trên điện thoại là dùng.",
        "href": "/salehub.html",
        "link": "Mở SaleHub"
      },
      {
        "id": "cong-cu",
        "title": "Công cụ tư vấn",
        "text": "Tính lãi vay, dòng tiền cho thuê, định giá ngay trước mặt khách.",
        "href": "/cong-cu.html",
        "link": "Xem công cụ"
      },
      {
        "id": "thuong-hieu",
        "title": "Hồ sơ & mã chứng nhận",
        "text": "Mã PL-xxxx tra cứu công khai và trang hồ sơ riêng cho từng thành viên.",
        "href": "/chung-nhan-doi-tac.html",
        "link": "Tra cứu chứng nhận"
      },
      {
        "id": "dao-tao",
        "title": "Đào tạo hội nhập",
        "text": "Bắt đầu bằng chương trình đào tạo khi nhận việc, trên nền dữ liệu và quy trình chung.",
        "href": "",
        "link": ""
      }
    ],
    "flow": [
      "Khách hàng",
      "Tư vấn",
      "Giao dịch"
    ]
  },
  "path": {
    "title": "Từ Agent đến Leader. Từ người bán hàng đến người xây sự nghiệp.",
    "sub": "Lộ trình 3 bậc, lũy tiến theo năng lực và kết quả. Điều kiện cụ thể của từng bậc được trao đổi minh bạch khi phỏng vấn.",
    "stages": [
      {
        "id": "sales",
        "title": "Sales / Agent",
        "points": [
          "Nhận khách từ Marketing",
          "Đào tạo hội nhập, học sản phẩm",
          "Lương cứng + chia sẻ doanh thu lũy tiến"
        ],
        "job": "agent-bat-dong-san"
      },
      {
        "id": "leader",
        "title": "Leader",
        "points": [
          "Chứng minh kết quả",
          "Xây và dẫn dắt đội nhóm",
          "Chia sẻ doanh thu đội nhóm"
        ],
        "job": "giam-doc-kinh-doanh"
      },
      {
        "id": "partner",
        "title": "Đối tác sở hữu",
        "points": [
          "Gắn bó dài hạn",
          "Dẫn dắt mảng kinh doanh",
          "Quyền lợi đồng sở hữu theo chính sách PaceLand"
        ],
        "job": ""
      }
    ]
  },
  "brand": {
    "title": "Mỗi giao dịch xây thêm giá trị nghề nghiệp của bạn.",
    "text": "Mỗi thành viên PaceLand có mã chứng nhận riêng, tra cứu công khai, cùng một trang hồ sơ trên paceland.vn. Khách hàng kiểm chứng được bạn trước khi gặp, và uy tín bạn tích lũy thuộc về chính bạn.",
    "link": "Xem {{partners}} hồ sơ đang hoạt động",
    "sampleProfile": "nguyen-trung-tin",
    "sampleLink": "Xem một trang hồ sơ thật"
  },
  "income": {
    "title": "Không chỉ là hoa hồng.",
    "sub": "Thu nhập rõ theo từng vị trí. Quyền lợi đi cùng cả hệ thống.",
    "benefits": [
      "Chia sẻ doanh thu lên đến 75%, cơ chế lũy tiến theo năng lực và kết quả",
      "Hỗ trợ khách hàng từ Marketing toàn diện",
      "Hệ thống đào tạo, dữ liệu và vận hành đồng bộ",
      "Danh mục sản phẩm cao cấp, thanh khoản tốt",
      "Mã chứng nhận và trang hồ sơ cá nhân trên paceland.vn",
      "Văn phòng hiện đại tại Quận 2"
    ]
  },
  "products": {
    "title": "Bán đúng phân khúc. Đi nhanh hơn.",
    "sub": "Những dự án PaceLand đang tập trung, dữ liệu đã chuẩn hóa để tư vấn.",
    "focus": [
      "palm-city",
      "imperia-sensa-park",
      "the-global-city",
      "the-prive",
      "vinhomes-green-paradise"
    ],
    "labels": {
      "palm-city": "Palm River (Palm City)",
      "vinhomes-green-paradise": "Vinhomes Green Paradise (Cần Giờ)"
    }
  },
  "process": {
    "title": "Quy trình tuyển dụng",
    "sub": "Bốn bước, gọn và rõ.",
    "steps": [
      {
        "title": "Gửi hồ sơ",
        "text": "Form trên trang, email, Zalo hoặc inbox fanpage PaceLand."
      },
      {
        "title": "Sơ vấn",
        "text": "Bộ phận tuyển dụng liên hệ trao đổi nhanh về kinh nghiệm, kỳ vọng và vị trí phù hợp."
      },
      {
        "title": "Phỏng vấn tại văn phòng",
        "text": "Gặp trực tiếp tại văn phòng Quận 2, trao đổi thẳng về công việc, cơ chế, mục tiêu và lộ trình."
      },
      {
        "title": "Thống nhất & nhận việc",
        "text": "Thống nhất cơ chế và hình thức làm việc, rồi bắt đầu đào tạo hội nhập. Vị trí kinh doanh được cấp mã chứng nhận PL-xxxx và quyền truy cập SaleHub."
      }
    ]
  },
  "form": {
    "title": "Ứng tuyển",
    "sub": "Chỉ cần họ tên, số điện thoại và vị trí. CV không bắt buộc ở bước đầu.",
    "privacy": "Thông tin chỉ được sử dụng cho mục đích tuyển dụng của PaceLand.",
    "experienceOptionsSales": [
      "Chưa có kinh nghiệm bán hàng",
      "Có kinh nghiệm sales ngoài BĐS",
      "Dưới 2 năm kinh nghiệm BĐS",
      "Từ 2 năm kinh nghiệm BĐS trở lên",
      "Đã quản lý đội nhóm kinh doanh"
    ],
    "experienceOptions": [
      "Mới ra trường hoặc dưới 1 năm",
      "1–3 năm đúng chuyên môn",
      "Trên 3 năm đúng chuyên môn",
      "Đã làm trong ngành bất động sản",
      "Đã quản lý đội nhóm"
    ],
    "successTitle": "Cảm ơn bạn. PaceLand đã nhận hồ sơ.",
    "successText": "Bộ phận tuyển dụng sẽ xem hồ sơ và liên hệ qua số điện thoại bạn để lại khi phù hợp. Muốn trao đổi thêm, bạn nhắn Zalo PaceLand kèm mã hồ sơ bên dưới.",
    "errorText": "Chưa gửi được hồ sơ. Anh/chị thử lại, hoặc gửi trực tiếp qua Zalo {{hotline}} hay email {{email}}."
  },
  "faq": [
    {
      "q": "PaceLand đang tuyển những vị trí nào?",
      "a": "PaceLand đang tuyển {{openings}} vị trí cho {{roles}} vai trò: {{jobsList}}. Tất cả làm việc tại văn phòng Quận 2, TP.HCM."
    },
    {
      "q": "Chưa có kinh nghiệm bất động sản có ứng tuyển Agent được không?",
      "a": "Được. PaceLand có hệ thống đào tạo và dữ liệu để người mới bắt đầu. Ứng viên từng làm sales được ưu tiên, nhưng đây không phải điều kiện bắt buộc."
    },
    {
      "q": "Thu nhập của Agent PaceLand gồm những gì?",
      "a": "Gồm lương cứng 5 triệu đồng/tháng và chia sẻ doanh thu theo cơ chế lũy tiến, tối đa đến 75%. Tỷ lệ cụ thể phụ thuộc năng lực và kết quả, được trao đổi rõ khi phỏng vấn."
    },
    {
      "q": "Agent có được hỗ trợ nguồn khách Marketing không?",
      "a": "Có. Theo chính sách tuyển dụng, PaceLand hỗ trợ khách hàng từ Marketing: website paceland.vn với {{projects}} trang dự án, {{posts}} bài phân tích thị trường cùng kênh Facebook, TikTok, YouTube."
    },
    {
      "q": "PaceLand đang phân phối những dòng sản phẩm nào?",
      "a": "Căn hộ, nhà phố, biệt thự cao cấp với danh mục {{projects}} dự án, tập trung vào {{focusList}}."
    },
    {
      "q": "Lộ trình từ Agent lên Leader như thế nào?",
      "a": "Lộ trình gồm 3 bậc: Sales (Agent) → Leader → Đối tác sở hữu, lũy tiến theo năng lực và kết quả. Điều kiện cụ thể của từng bậc được trao đổi trực tiếp khi phỏng vấn."
    },
    {
      "q": "Làm việc tại PaceLand ở đâu?",
      "a": "Tại văn phòng PaceLand ở Quận 2 cũ: {{address}}."
    },
    {
      "q": "Quy trình tuyển dụng gồm những bước nào?",
      "a": "Gồm 4 bước: gửi hồ sơ, sơ vấn, phỏng vấn trực tiếp tại văn phòng Quận 2, rồi thống nhất cơ chế, nhận việc và đào tạo hội nhập."
    },
    {
      "q": "Mã chứng nhận PL-xxxx là gì?",
      "a": "Mỗi thành viên PaceLand được cấp một mã chứng nhận riêng, tra cứu công khai tại trang Chứng nhận đối tác, kèm trang hồ sơ cá nhân trên paceland.vn."
    },
    {
      "q": "Ứng tuyển bằng cách nào?",
      "a": "Điền form trên trang này (chỉ cần họ tên, số điện thoại, vị trí), hoặc gửi CV qua email {{email}}, Zalo {{hotline}} hay inbox fanpage PaceLand."
    }
  ],
  "finalCta": {
    "title": "Bắt đầu bằng một cuộc trao đổi.",
    "sub": "Không cần hồ sơ hoàn hảo. Để lại thông tin, PaceLand liên hệ khi phù hợp.",
    "button": "Ứng tuyển ngay"
  },
  "seo": {
    "title": "Tuyển dụng bất động sản Quận 2: {{openings}} vị trí | PaceLand",
    "description": "Tuyển {{openings}} vị trí bất động sản tại Quận 2, TP.HCM: {{rolesList}}. Chia sẻ doanh thu đến 75%."
  },
  "posters": {
    "hub": "assets/img/tuyen-dung/tong-hop.jpg",
    "products": "assets/img/tuyen-dung/danh-muc.jpg",
    "income": "assets/img/tuyen-dung/quyen-loi.jpg"
  },
  "ogImage": "assets/img/tuyen-dung/og-tuyen-dung.jpg",
  "stories": []
};

/* Chứng nhận Đối tác — danh bạ cố vấn/đối tác chính thức để khách hàng tra cứu xác minh.
   Quản lý trong Admin → Chứng nhận Đối tác. status: "active" (đang hợp tác) | "inactive" (đã ngừng). */
const PARTNERS = [
  {
    "id": "vo-van-phuoc",
    "code": "PL-0001",
    "name": "Võ Văn Phước",
    "role": "Nhà sáng lập & CEO",
    "level": "Ban lãnh đạo",
    "status": "active",
    "photo": "assets/img/founder.jpg",
    "since": "2021",
    "phone": "",
    "bio": "Nhà sáng lập PaceLand — cố vấn đầu tư bất động sản hạng sang, đồng hành cùng doanh nhân và khách hàng có tài sản lớn trong hành trình lựa chọn bất động sản xứng tầm.",
    "achievements": [
      "12+ năm kinh nghiệm bất động sản hạng sang",
      "800+ khách hàng đồng hành"
    ],
    "website": "http://phuocvo.com/"
  },
  {
    "id": "ha-hoang-hieu",
    "code": "PL-0004",
    "name": "Hà Hoàng Hiếu",
    "role": "Tổng Giám đốc",
    "level": "Ban lãnh đạo",
    "status": "active",
    "photo": "assets/img/media/avatar-chuyen-vien.svg",
    "since": "",
    "phone": "",
    "bio": "",
    "achievements": []
  },
  {
    "id": "vu-trong-khai",
    "code": "PL-0002",
    "name": "Vũ Trọng Khải",
    "role": "Phó Tổng Giám đốc Công nghệ & Marketing",
    "level": "Ban lãnh đạo",
    "status": "active",
    "photo": "assets/img/media/avatar-chuyen-vien.svg",
    "since": "",
    "phone": "",
    "bio": "Cố vấn và quản lý tài sản bất động sản cao cấp tại TP.HCM, Nha Trang, Vũng Tàu — tư vấn đầu tư, căn hộ hạng sang, biệt thự và BĐS nghỉ dưỡng dựa trên dữ liệu.",
    "achievements": [],
    "website": "https://www.vutrongkhai.com/",
    "area": "TP.HCM · Nha Trang · Vũng Tàu"
  },
  {
    "id": "tran-huynh-ngoc-han",
    "code": "PL-0005",
    "name": "Trần Huỳnh Ngọc Hân",
    "role": "Phó Tổng Giám đốc Vận hành",
    "level": "Ban lãnh đạo",
    "status": "active",
    "photo": "assets/img/media/avatar-chuyen-vien.svg",
    "since": "",
    "phone": "",
    "bio": "",
    "achievements": []
  },
  {
    "id": "le-thi-kim-xuyen",
    "code": "PL-0006",
    "name": "Lê Thị Kim Xuyến",
    "role": "Giám đốc Phát triển Kinh doanh",
    "level": "Ban lãnh đạo",
    "status": "active",
    "photo": "assets/img/media/avatar-chuyen-vien.svg",
    "since": "",
    "phone": "",
    "bio": "",
    "achievements": []
  },
  {
    "id": "nguyen-thi-thu-huyen",
    "code": "PL-0007",
    "name": "Nguyễn Thị Thu Huyền",
    "role": "Sales Agent",
    "level": "Chuyên viên tư vấn",
    "status": "active",
    "photo": "assets/img/media/avatar-chuyen-vien.svg",
    "since": "",
    "phone": "",
    "bio": "",
    "achievements": []
  },
  {
    "id": "nguyen-hoang-phuong-dung",
    "code": "PL-0008",
    "name": "Nguyễn Hoàng Phương Dung",
    "role": "Sales Agent",
    "level": "Chuyên viên tư vấn",
    "status": "active",
    "photo": "assets/img/media/avatar-chuyen-vien.svg",
    "since": "",
    "phone": "",
    "bio": "",
    "achievements": []
  },
  {
    "id": "pham-thi-hoa",
    "code": "PL-0009",
    "name": "Phạm Thị Hoa",
    "role": "Sales Agent",
    "level": "Chuyên viên tư vấn",
    "status": "active",
    "photo": "assets/img/media/avatar-chuyen-vien.svg",
    "since": "",
    "phone": "",
    "bio": "",
    "achievements": []
  },
  {
    "id": "trinh-thi-hien",
    "code": "PL-0010",
    "name": "Trịnh Thị Hiền",
    "role": "Sales Agent",
    "level": "Chuyên viên tư vấn",
    "status": "active",
    "photo": "assets/img/media/avatar-chuyen-vien.svg",
    "since": "",
    "phone": "",
    "bio": "",
    "achievements": []
  },
  {
    "id": "le-thi-diem-xuan",
    "code": "PL-0011",
    "name": "Lê Thị Diễm Xuân",
    "role": "Sales Agent",
    "level": "Chuyên viên tư vấn",
    "status": "active",
    "photo": "assets/img/media/avatar-chuyen-vien.svg",
    "since": "",
    "phone": "",
    "bio": "",
    "achievements": []
  },
  {
    "id": "nguyen-trung-tin",
    "code": "PL-0003",
    "name": "Nguyễn Trung Tín",
    "role": "Sales Agent · Luxury Real Estate Advisor",
    "level": "Chuyên viên tư vấn",
    "status": "active",
    "photo": "assets/img/media/avatar-chuyen-vien.svg",
    "since": "",
    "phone": "",
    "bio": "Tư vấn căn hộ hạng sang, branded residence và biệt thự tại Thủ Thiêm, Ba Son, Quận 1 và Khu Đông TP.HCM, phân khúc 8–40 tỉ — thẩm định pháp lý và chủ đầu tư trước khi tư vấn.",
    "achievements": [],
    "website": "https://trungtinproperty.com/",
    "area": "Thủ Thiêm · Ba Son · Quận 1 · Khu Đông"
  },
  {
    "id": "nguyen-que-huong",
    "code": "PL-0012",
    "name": "Nguyễn Quế Hương",
    "role": "Sales Agent",
    "level": "Chuyên viên tư vấn",
    "status": "active",
    "photo": "assets/img/media/avatar-chuyen-vien.svg",
    "since": "",
    "phone": "",
    "bio": "",
    "achievements": []
  },
  {
    "id": "nguyen-huu-duc-phuoc",
    "code": "PL-0013",
    "name": "Nguyễn Hữu Đức Phước",
    "role": "Sales Agent",
    "level": "Chuyên viên tư vấn",
    "status": "active",
    "photo": "assets/img/media/avatar-chuyen-vien.svg",
    "since": "",
    "phone": "",
    "bio": "",
    "achievements": []
  },
  {
    "id": "le-ngoc-thanh",
    "code": "PL-0014",
    "name": "Lê Ngọc Thanh",
    "role": "Sales Agent",
    "level": "Chuyên viên tư vấn",
    "status": "active",
    "photo": "assets/img/media/avatar-chuyen-vien.svg",
    "since": "",
    "phone": "",
    "bio": "",
    "achievements": []
  },
  {
    "id": "pham-thi-thao",
    "code": "PL-0015",
    "name": "Phạm Thị Thảo",
    "role": "Sales Agent",
    "level": "Chuyên viên tư vấn",
    "status": "active",
    "photo": "assets/img/media/avatar-chuyen-vien.svg",
    "since": "",
    "phone": "",
    "bio": "",
    "achievements": []
  },
  {
    "id": "huynh-le-ngoc-tram",
    "code": "PL-0016",
    "name": "Huỳnh Lê Ngọc Trâm",
    "role": "Sales Agent",
    "level": "Chuyên viên tư vấn",
    "status": "active",
    "photo": "assets/img/media/avatar-chuyen-vien.svg",
    "since": "",
    "phone": "",
    "bio": "",
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
        "a": "Nhân sự kinh doanh trực tiếp (Agent) nhận lương cứng 5 triệu/tháng và chia sẻ doanh thu lũy tiến lên đến 75% theo năng lực và kết quả; đối tác đại lý hưởng chính sách 50–70%. Lộ trình dài hạn có cơ hội nhận cổ phần ưu đãi (lộ trình 3 năm). Chi tiết xem trang Tuyển dụng và trang Đối tác."
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
  window.SITE = SITE; window.NAV = NAV; window.PROJECTS = PROJECTS; window.POSTS = POSTS; window.FILTERS = FILTERS; window.VALUES = VALUES; window.JOBS = JOBS; window.CAREERS = CAREERS; window.PARTNERS = PARTNERS; window.FAQS = FAQS; window.PAGES = PAGES; window.HERO_SLIDES = HERO_SLIDES; window.HERO_SLIDES_REPO = HERO_SLIDES_REPO; window.HERO_SLIDES_BRANCH = HERO_SLIDES_BRANCH; window.ph = ph;
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
    /* Vị trí: gộp theo id — bản lưu cũ thiếu trường mới (faq, hero, …) vẫn giữ trường đó từ data.js */
    if (Array.isArray(cms.jobs) && cms.jobs.length && cms.jobs.every(function (j) { return j && j.category && j.status; })) {
      var seedJobs = {};
      JOBS.forEach(function (sj) { seedJobs[sj.id] = sj; });
      r(JOBS, cms.jobs.map(function (cj) { return Object.assign({}, seedJobs[cj.id] || {}, cj); }));
    }
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
