/* PaceLand — assets/js/data.js (xuất từ trang quản trị 14:53:42 22/6/2026) */

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
  "facebook": "#",
  "youtube": "#",
  "tiktok": "#",
  "formEndpoint": "https://formspree.io/f/your-form-id",
  "mapEmbed": "https://www.google.com/maps?q=Th%E1%BB%A7%20Thi%C3%AAm%2C%20TP.%20Th%E1%BB%A7%20%C4%90%E1%BB%A9c&output=embed"
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
    "cover": "1545324418-cc1a3fa10c00",
    "gallery": [
      "1545324418-cc1a3fa10c00",
      "1600607687939-ce8a6c25118c",
      "1600585154340-be6161a56a0c",
      "1600210492486-724fe5c67fb0",
      "1600566753086-00f18fb6b3ea"
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
    "cover": "1512917774080-9991f1c4c750",
    "gallery": [
      "1512917774080-9991f1c4c750",
      "1600047509807-ba8f99d2cdde",
      "1600566753086-00f18fb6b3ea",
      "1605276374104-dee2a0ed3cd6",
      "1600210492486-724fe5c67fb0"
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
    "cover": "1486406146926-c627a92ad1ab",
    "gallery": [
      "1486406146926-c627a92ad1ab",
      "1512453979798-5ea266f8880c",
      "1493809842364-78817add7ffb",
      "1564013799919-ab600027ffc6",
      "1518780664697-55e3ad937233"
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
    "priceText": "Từ 8,9 tỉ",
    "priceValue": 8.9,
    "beds": "1–3 PN",
    "size": "48 – 110 m²",
    "handover": "2028",
    "cover": "1600596542815-ffad4c1539a9",
    "gallery": [
      "1600596542815-ffad4c1539a9",
      "1600585154340-be6161a56a0c",
      "1600607687939-ce8a6c25118c",
      "1583608205776-bfd35f0d9f83",
      "1600047509807-ba8f99d2cdde"
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
    "cover": "1502672260266-1c1ef2d93688",
    "gallery": [
      "1502672260266-1c1ef2d93688",
      "1493809842364-78817add7ffb",
      "1512453979798-5ea266f8880c",
      "1600566753086-00f18fb6b3ea",
      "1605276374104-dee2a0ed3cd6"
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
    "cover": "1580587771525-78b9dba3b914",
    "gallery": [
      "1580587771525-78b9dba3b914",
      "1600210492486-724fe5c67fb0",
      "1600047509807-ba8f99d2cdde",
      "1600585154340-be6161a56a0c",
      "1564013799919-ab600027ffc6"
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
    "cover": "1518780664697-55e3ad937233",
    "gallery": [
      "1518780664697-55e3ad937233",
      "1449844908441-8829872d2607",
      "1564013799919-ab600027ffc6",
      "1583608205776-bfd35f0d9f83",
      "1600596542815-ffad4c1539a9"
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
    "cover": "1493809842364-78817add7ffb",
    "gallery": [
      "1493809842364-78817add7ffb",
      "1502672260266-1c1ef2d93688",
      "1512453979798-5ea266f8880c",
      "1605276374104-dee2a0ed3cd6",
      "1600566753086-00f18fb6b3ea"
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
    "cover": "1449844908441-8829872d2607",
    "gallery": [
      "1449844908441-8829872d2607",
      "1518780664697-55e3ad937233",
      "1583608205776-bfd35f0d9f83",
      "1600596542815-ffad4c1539a9",
      "1580587771525-78b9dba3b914"
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
    "id": "ban-dang-mua-o-gia-ban-le-hay-gia-co-hoi",
    "title": "Bạn đang mua ở giá bán lẻ hay giá cơ hội?",
    "category": "Góc nhìn PaceLand",
    "date": "12/06/2026",
    "readtime": "6 phút đọc",
    "cover": "assets/img/media/9.jpg",
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
    "cover": "1460472178825-e5240623afd5",
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
    "cover": "1477959858617-67f85cf4f1df",
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
    "cover": "1556761175-5973dc0f32e7",
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
    "cover": "1521737711867-e3b97375f902",
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
    "cover": "1515263487990-61b07816b324",
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
    "id": "chuyen-vien-tiep-thi",
    "title": "Chuyên viên Tiếp thị số",
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

if (typeof window !== "undefined") {
  window.SITE = SITE; window.NAV = NAV; window.PROJECTS = PROJECTS; window.POSTS = POSTS; window.FILTERS = FILTERS; window.VALUES = VALUES; window.JOBS = JOBS; window.FAQS = FAQS; window.PAGES = PAGES; window.ph = ph;
}

/* CMS override */
(function () { if (typeof window === 'undefined') return; try { var cms = JSON.parse(localStorage.getItem('pl_cms') || 'null'); if (!cms) return; if (cms.site) Object.assign(SITE, cms.site); function r(a, d) { if (Array.isArray(d)) { a.length = 0; d.forEach(function (x) { a.push(x); }); } } r(PROJECTS, cms.projects); r(POSTS, cms.posts); r(JOBS, cms.jobs); r(FAQS, cms.faqs); if (cms.pages) { for (var pg in cms.pages) { if (PAGES[pg]) PAGES[pg].fields.forEach(function (f) { if (cms.pages[pg][f.k] != null) f.value = cms.pages[pg][f.k]; }); } } window.SITE = SITE; window.PROJECTS = PROJECTS; window.POSTS = POSTS; window.JOBS = JOBS; window.FAQS = FAQS; window.PAGES = PAGES; } catch (e) {} })();
