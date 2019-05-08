import React, { useState, useEffect }  from 'react';
import { Link } from 'react-router-dom';
import { Menu, Layout, Icon, message, Modal, Button } from 'antd';
import { $common } from "../../services/http";
import axios from "axios";

const { SubMenu } = Menu;
const { Sider } = Layout;

export default () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [positionArray, setPositionArray] = useState([]);
  const [menu, setMenu] = useState([]);

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
        setMenu(data[0].children)
      });
  }

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
        const {commonInfo, studentInfo, teacherInfo} = data;
        sessionStorage.setItem('user', JSON.stringify(commonInfo.user));
        sessionStorage.setItem('casUser', commonInfo.user.loginName);
        sessionStorage.setItem('schoolCode', commonInfo.user.schoolCode);
        sessionStorage.setItem('studentInfo', JSON.stringify(studentInfo));
        sessionStorage.setItem('teacherInfo', JSON.stringify(teacherInfo));
        axios.defaults.headers.common['Authorization'] = commonInfo.jwt;
        const treeviewPositionDtoList = commonInfo.treeviewPositionDtoList;
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
        defaultSelectedKeys={[]}
        defaultOpenKeys={[]}
        className="menu-side"
      >
        {
          menu.map(firstLevelItem => {
            if (firstLevelItem.children && firstLevelItem.children.length > 0) {
              return (
                <SubMenu key={firstLevelItem.id} title={<span><Icon type="bars" />{firstLevelItem.text}</span>}>
                  {
                    firstLevelItem.children.map(secondLevelItem => {
                      if (secondLevelItem.children && secondLevelItem.children.length > 0) {
                        return (
                          <SubMenu key={secondLevelItem.id} title={<span><Icon type="bars" />{secondLevelItem.text}</span>}>
                            {
                              secondLevelItem.children.map(thirdLevelItem => {
                                return (
                                  <Menu.Item key={thirdLevelItem.id}>
                                    <Link to={thirdLevelItem.url}>
                                      <span className={'text-black'}>{thirdLevelItem.text}</span>
                                    </Link>
                                  </Menu.Item>
                                )
                              })
                            }
                          </SubMenu>
                        )
                      } else {
                        return (
                          <Menu.Item key={secondLevelItem.id}>
                            <Link to={secondLevelItem.url}>
                              <span className={'text-black'}>{secondLevelItem.text}</span>
                            </Link>
                          </Menu.Item>
                        )
                      }
                    })
                  }
                </SubMenu>
              )
            } else {
              return (
                <Menu.Item key={firstLevelItem.id}>
                  <Link to={firstLevelItem.url}>
                    <span className={'text-black'}>{firstLevelItem.text}</span>
                  </Link>
                </Menu.Item>
              )
            }
          })
        }
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
}
