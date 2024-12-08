import { useState, useEffect } from 'react';
import clsx from 'clsx';
import styles from './GroupInfo.module.scss';
import Button from '../../components/Button';
import { useSelector } from 'react-redux';

function GroupInfo() {
  const [selectedTab, setSelectedTab] = useState('Members');
  const [groupDetails, setGroupDetails] = useState({
    name: '',
    bio: '',
  });
  const [isEditing, setIsEditing] = useState(false);

  const { groupInfo } = useSelector((state) => state?.profile);

  useEffect(() => {
    if (groupInfo) {
      setGroupDetails({
        name: groupInfo.groupName || '',
        bio: groupInfo.bio || '',
      });
    }
  }, [groupInfo]);

  if (!groupInfo) {
    return <div>Loading group info...</div>;
  }

  const members =
    groupInfo.userInGroups?.map((user) => ({
      id: user.userId,
      name: `${user.user?.lastName || ''} ${user.user?.firstName || ''}`.trim(),
      profilePicture: user.user?.profilePicture || 'https://via.placeholder.com/150',
    })) || [];

  const handleSelectTab = (tab) => {
    setSelectedTab(tab);
    setIsEditing(false);
  };

  const handleEditGroupInfo = () => {
    setIsEditing(true);
  };

  const handleSaveGroupInfo = () => {
    if (window.confirm('Bạn có chắc chắn muốn lưu các thay đổi?')) {
      alert('Thông tin nhóm đã được cập nhật!');
      setIsEditing(false);
      // TODO: Gọi API lưu dữ liệu groupDetails
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGroupDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className={clsx(styles.container)}>
      <div className={clsx(styles.sidebar)}>
        <h1>Quản lý nhóm</h1>
        <ul className={clsx(styles.tabList)}>
          <li
            className={clsx({ [styles.active]: selectedTab === 'Members' })}
            onClick={() => handleSelectTab('Members')}
          >
            Danh sách thành viên
          </li>

          <li
            className={clsx({ [styles.active]: selectedTab === 'Edit Group Info' })}
            onClick={() => handleSelectTab('Edit Group Info')}
          >
            Chỉnh sửa thông tin nhóm
          </li>
        </ul>
      </div>

      <div className={clsx(styles.content)}>
        {selectedTab === 'Members' && (
          <div className={clsx(styles.membersTab)}>
            <h1>Danh sách thành viên</h1>
            <div className={clsx(styles.membersGrid)}>
              {members.map((member) => (
                <div key={member.id} className={clsx(styles.memberCard)}>
                  <img
                    src={member.profilePicture}
                    alt={member.name}
                    className={clsx(styles.avatar)}
                  />
                  <p>{member.name || 'Thành viên không xác định'}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedTab === 'Edit Group Info' && (
          <div className={clsx(styles.editGroupTab)}>
            <h1>Chỉnh sửa thông tin nhóm</h1>
            {isEditing ? (
              <div className={clsx(styles.editForm)}>
                <div className={clsx(styles.formGroup)}>
                  <label htmlFor="name">Tên nhóm:</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={groupDetails.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className={clsx(styles.formGroup)}>
                  <label htmlFor="bio">Mô tả nhóm:</label>
                  <textarea
                    id="bio"
                    name="bio"
                    value={groupDetails.bio}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
                <div className={clsx(styles.formActions)}>
                  <Button size="large" onClick={handleSaveGroupInfo}>
                    Lưu thay đổi
                  </Button>
                </div>
              </div>
            ) : (
              <div className={clsx(styles.groupInfoDisplay)}>
                <p>
                  <strong>Tên nhóm:</strong> {groupDetails.name}
                </p>
                <p>
                  <strong>Mô tả:</strong> {groupDetails.bio}
                </p>
                <Button size="large" onClick={handleEditGroupInfo}>
                  Chỉnh sửa
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default GroupInfo;
