import React from "react";

const thStyle = {
    fontFamily: "Kanit",
    fontWeight: "normal",
    fontStyle: "normal",
    border:"normal",
    fontSize:"24px",
    marginTop: "20px"

};
const sta = {
  marginTop: "50px",
  textAlign: "center",
  fontFamily: "Anton"
}
  
class DataComponent extends React.Component {
    render() {
      return (
        <div style={sta}>
        <h1 style={sta}>รายการสั่งอาหารรายเดือน มีนาคม พ.ศ. 2565</h1>
        <table style={thStyle} className="table">
          <thead>
              <tr>
                <th>ชื่อรายการอาหาร</th>
                <th>จำนวน</th>
                <th>ราคา</th>
                <th>รวม</th>
              </tr>
          </thead>
          <tbody>
              <tr>
                <td>ฮาวาเอียน</td>
                <td>25</td>
                <td>89</td>
                <td>2225</td>
                
              </tr>
              <tr>
                <td>แฮม-ปูอัด</td>
                <td>20</td>
                <td>89</td>
                <td>1780</td>
                
              </tr>
              <tr>
                <td>ซีฟู้ด</td>
                <td>16</td>
                <td>119</td>
                <td>1904</td>
                
              </tr>
              
              <tr>
                <td>ข้าวโพดชีส</td>
                <td>11</td>
                <td>89</td>
                <td>979</td>
                
              </tr>
              <tr>
                <td><strong>แฮม-ฮัชบราว์น</strong></td>
                <td>17</td>
                <td>89</td>
                <td>1513</td>

              </tr><tr>
                <td><strong>หนอนด้วง</strong></td>
                <td>6</td>
                <td>89</td>
                <td>534</td>

              </tr>
              <tr>
                <td><strong>ผักขมอบชีส</strong></td>
                <td>7</td>
                <td>89</td>
                <td>623</td>

              </tr>
              <tr>
                <td><strong>ดับเบิ้ลชีส</strong></td>
                <td>9</td>
                <td>99</td>
                <td>891</td>

              </tr>
              <tr>
                <td><strong>เบค่อนหมูชีส</strong></td>
                <td>8</td>
                <td>99</td>
                <td>792</td>

              </tr>
              <tr>
                <td><strong>ผักรวม</strong></td>
                <td>8</td>
                <td>89</td>
                <td>712</td>

              </tr>
              <tr>
                <td><strong>ถั่วแระญี่ปุ่น</strong></td>
                <td>9</td>
                <td>89</td>
                <td>801</td>

              </tr>
              <tr>
                <td><strong>ไก่จ๊อ</strong></td>
                <td>10</td>
                <td>89</td>
                <td>890</td>

              </tr>
              <tr>
                <td><strong>นักเก๊ต</strong></td>
                <td>35</td>
                <td>59</td>
                <td>2065</td>

              </tr>
              <tr>
                <td><strong>เฟรนฟราย</strong></td>
                <td>46</td>
                <td>59</td>
                <td>2714</td>

              </tr>
          </tbody>
          
        </table>
        </div>     
      );
    }
  }

  export default DataComponent;