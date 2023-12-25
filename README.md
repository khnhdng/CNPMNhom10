Bật XAMPPL: Apahce, MySQL

Nếu như: Apache ko bật được -> mở cmd quyền quản trị viên gõ lệnh "net stop http" ->"Y"
npm init
npm -v

npm install --save body-parser@1.19.0 dotenv@8.2.0 ejs@3.1.5 express@4.17.1
npm install --save-dev @babel/core@7.12.10 @babel/preset-env@7.12.10
npm install --save-dev sequelize-cli@6.2.0
npm install --save mysql2@2.2.5
npm install --save sequelize@6.6.2
npm install --save multer

npm start

npx sequelize-cli db:migrate

 

//Insert data

node ./src/insert/insertLoaiThe.js
node ./src/insert/insertLoaiChungChi.js
node ./src/insert/insertLoaiCauThu.js
node ./src/insert/insertLoaiBanThang.js
node ./src/insert/insertChungChi.js
node ./src/insert/insertDoiBong.js
node ./src/insert/insertChucVu.js
node ./src/insert/insertCauThu.js
node ./src/insert/insertLichThiDau.js
node ./src/insert/insertHuanLuyenVien.js
node ./src/insert/insert_loaicauthu.js
node ./src/insert/insertDienBien.js

