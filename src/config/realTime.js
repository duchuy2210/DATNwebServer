import lodash from 'lodash';
import { Server } from 'socket.io';
import { getDatabase, ref, onValue } from 'firebase/database';
import { realTimeDb } from './firebase-config';

export const initRealtime = (server, PLC) => {
  const io = new Server(server);
  io.on('connection', function (socket) {
    //GỬI DỮ LIỆU BẢNG TAG ĐẾN CLIENT (TRÌNH DUYỆT)
    socket.on('Client-send-data', function (data) {
      io.sockets.emit('tag_Bool', arr_tag_value[0]);
      io.sockets.emit('tag_Byte', arr_tag_value[1]);
      io.sockets.emit('tag_Integer', arr_tag_value[2]);
      io.sockets.emit('tag_Real', arr_tag_value[3]);
      io.sockets.emit('tag_String', arr_tag_value[4]);
    });
    // Bật tắt động cơ M1
    socket.on('Client-send-cmdM1', function (data) {
      PLC.writeItems('tag_Bool', data, error);
    });
  });
  function error(anythingBad) {
    if (anythingBad) {
      console.log('SOMETHING WENT WRONG WRITING VALUES!!!!');
    }
    console.log('Done writing.');
  }
  let arr_tag_value = []; // Tạo một mảng lưu giá trị tag đọc về
  // Đọc dữ liệu từ PLC và đưa vào array tags
  function valuesReady(anythingBad, values) {
    if (anythingBad) {
      console.log('Lỗi khi đọc dữ liệu tag');
    } // Cảnh báo lỗi
    arr_tag_value = lodash.map(values, item => item);
    console.log(values); // Hiển thị giá trị để kiểm tra
  }
  function fn_read_data_scan() {
    PLC.readAllItems(valuesReady);
  }
  //Time cập nhật mỗi 1s
  setInterval(() => {
    fn_read_data_scan();
    // onValue(ref(realTimeDb, 'DATN-data'), snapshot => {
    //   const data = snapshot.val();
    //   console.log('data:', data);
    //   // console.log('write_value:', write_value);
    //   console.log('-----------WRITE PLC-------------');
    //   PLC.writeItems('tag_Bool', data.tag_Bool, error);
    //   PLC.writeItems('tag_Byte', data.tag_Byte, error);
    //   PLC.writeItems('tag_Integer', data.tag_Integer, error);
    //   PLC.writeItems('tag_Real', data.tag_Real, error);
    //   PLC.writeItems('tag_String', data.tag_String, error);
    // });
  }, 500);
};
