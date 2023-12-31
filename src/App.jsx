import FormAddFriend from './FormAddFriend';
import FriendsList from './FriendList';
import Button from './Button';
import FormSplitBill from './FormSplitBill';
import { useState } from 'react';

const initialFriends = [
  {
    id: 118836,
    name: 'Clark',
    image: 'https://i.pravatar.cc/48?u=118836',
    balance: -7,
  },
  {
    id: 933372,
    name: 'Sarah',
    image: 'https://i.pravatar.cc/48?u=933372',
    balance: 20,
  },
  {
    id: 499476,
    name: 'Anthony',
    image: 'https://i.pravatar.cc/48?u=499476',
    balance: 0,
  },
];

export default function App() {
  const [isAddFriendFormOpen, setIsAddFriendFormOpen] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [friends, setFriends] = useState(initialFriends);

  const handleAddFriendFormButton = () => {
    setIsAddFriendFormOpen(!isAddFriendFormOpen);
  };

  const handleAddFriend = (friendObject) => {
    setFriends((friends) => [...friends, friendObject]);
    setIsAddFriendFormOpen(false);
  };

  const handleSelectFriend = (friend) => {
    setSelectedFriend((selected) =>
      selected?.id === friend.id ? null : friend
    );
    setIsAddFriendFormOpen(false);
  };

  const handleSplitBill = (value) => {
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );

    setSelectedFriend(null);
  };

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          selectedFriend={selectedFriend}
          friends={friends}
          onSelection={handleSelectFriend}
        ></FriendsList>

        {isAddFriendFormOpen && (
          <FormAddFriend onAddFriend={handleAddFriend}></FormAddFriend>
        )}

        <Button handleButtonClick={handleAddFriendFormButton}>
          {isAddFriendFormOpen ? 'Close form' : 'Add friend'}
        </Button>
      </div>

      {selectedFriend && (
        <FormSplitBill
          onSplitBill={handleSplitBill}
          selectedFriend={selectedFriend}
        ></FormSplitBill>
      )}
    </div>
  );
}
