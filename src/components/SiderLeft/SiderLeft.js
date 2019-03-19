import React, { useState, useEffect }  from 'react';
import { Menu, Layout, Icon, message, Modal, Button } from 'antd';
import { $common } from "../../services/http";

const { SubMenu } = Menu;
const { Sider } = Layout;


/**
 * 获取菜单
 * @param positionId
 * @param userId
 */
function getMenu(positionId, userId) {
  $common
    .get('/api/menu/v1/getMenuListByUserId', {
      params: {
        userId: userId,
        projectName: 'jwgl',
        positionId: positionId
      }
    })
    .then(({data}) => {
      console.log(data)
    });
}

export default () => {

  const [modalVisible, setModalVisible] = useState(false);
  const [positionArray, setPositionArray] = useState([]);

  function handlePositionClick(positionId, userId) {
    setModalVisible(false);
    getMenu(positionId, userId)
  }

  useEffect(() => {
    $common
      .get('/inner/user/v1/getUserForLoginName', {
        params: {
          loginName: sessionStorage.getItem('casUser')
        }
      })
      .then(({data}) => {
        console.log(data);
        const treeviewPositionDtoList = data.commonInfo.treeviewPositionDtoList;
        const positions = [];
        for (let i = 0; i < treeviewPositionDtoList.length; i++) {
          if (treeviewPositionDtoList[i].positionId) {
            positions.push(treeviewPositionDtoList[i])
          }
        }

        if (positions.length === 0) {
          message.error('当前账户无职务，请配置后重试')
        } else if (positions.length === 1) {
          const {positionId, userId} = positions[0];
          getMenu(positionId, userId)
        } else {
          setModalVisible(true);
          setPositionArray(positions)

        }
      });
  }, []);

  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
    >
      <Menu
        mode="inline"
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        className="menu-side"
      >
        <SubMenu key="sub1" title={<span><Icon type="user" />subnav 1</span>}>
          <Menu.Item key="1">option1</Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" title={<span><Icon type="laptop" />subnav 2</span>}>
          <Menu.Item key="5">option5</Menu.Item>
        </SubMenu>
        <SubMenu key="sub3" title={<span><Icon type="notification" />subnav 3</span>}>
          <Menu.Item key="9">option9</Menu.Item>
        </SubMenu>
      </Menu>
      <Modal
        align={{}}
        title="选择职务"
        visible={modalVisible}
        footer={null}
      >
        {
          positionArray.map((position, index) => {
            const {positionId, userId} = position;
            return (
              <Button
                htmlType={"button"}
                type={"primary"}
                onClick={() => handlePositionClick(positionId, userId)}
                key={index}
              >
                {position.positionName}
              </Button>
            )
          })
        }
      </Modal>
    </Sider>
  )
};
