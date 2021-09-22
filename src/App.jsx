import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AvailableProfessions from './components/AvailableProfessions/AvailableProfessions';
import CurrentPlayer from './components/CurrentPlayer/CurrentPlayer';
import CustomButton from './components/CustomButton/CustomButton';
import CustomModal from './components/CustomModal/CustomModal';
import NewPlayer from './components/ModalViews/NewPlayer/NewPlayer';
import PlayersList from './components/PlayersList/PlayersList';
import { NEW_PLAYER_MODAL } from './constants/modals';
import { showModal, selectActiveModal } from './store/reducers/activeModal';
import { selectPlayersList } from './store/reducers/players';

function App() {
  const activeModal = useSelector(selectActiveModal);
  const playersList = useSelector(selectPlayersList);
  const isNewPlayerModalOpen = activeModal.name === NEW_PLAYER_MODAL;

  const dispatch = useDispatch();

  const showNewPlayerModal = () => {
    dispatch(showModal({ name: NEW_PLAYER_MODAL }));
  };

  return (
    <div className="App">
      <p>Исключительно для некоммерческого использования</p>
      <header className="header">
        <CustomButton buttonText="Создать нового игрока" type="button" onClick={showNewPlayerModal} />
      </header>
      <AvailableProfessions />
      <PlayersList playersList={playersList} />
      <CurrentPlayer />
      <CustomModal isOpen={isNewPlayerModalOpen}>
        <NewPlayer />
      </CustomModal>
    </div>
  );
}

export default App;
