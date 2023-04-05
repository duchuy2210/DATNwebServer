export const connectPLC = conn_plc => {
  // Tạo địa chỉ kết nối (slot = 2 nếu là 300/400, slot = 1 nếu là 1200/1500)
  conn_plc.initiateConnection(
    { port: 102, host: '192.168.0.8', rack: 0, slot: 1 },
    PLC_connected
  );
  // Bảng tag trong Visual studio code
  const tags_list = {
    tag_Bool: 'DB1,X0.0', // Dữ liệu dạng bool
    tag_Byte: 'DB1,BYTE1', // Dữ liệu dạng Byte
    tag_Integer: 'DB1,INT2', // Dữ liệu dạng số nguyên integer
    tag_Real: 'DB1,REAL4', // Dữ liệu dạng số thực real
    tag_String: 'DB1,S8.256', // Dữ liệu dạng ký tự
  };
  // GỬI DỮ LIỆu TAG CHO PLC
  function PLC_connected(err) {
    if (typeof err !== 'undefined') {
      console.log(err); // Hiển thị lỗi nếu không kết nối đƯỢc với PLC
    }
    conn_plc.setTranslationCB(function (tag) {
      return tags_list[tag];
    }); // Đưa giá trị đọc lên từ PLC và mảng
    conn_plc.addItems([
      'tag_Bool', // Dữ liệu dạng bool
      'tag_Byte', // Dữ liệu dạng byte
      'tag_Integer', // Dữ liệu dạng số nguyên integer
      'tag_Real', // Dữ liệu dạng số thực real
      'tag_String', // Dữ liệu dạng ký tự
    ]);
  }
};
