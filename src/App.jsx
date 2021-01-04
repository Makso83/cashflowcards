import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomModal from './components/CustomModal/CustomModal';
import NewPlayer from './components/ModalViews/NewPlayer/NewPlayer';
import { NEW_PLAYER_MODAL } from './constants/modals';
import { showModal } from './store/actions/activeModal';
import selectActiveModal from './store/selectors/activeModal';

function App() {
  const activeModal = useSelector(selectActiveModal);
  const isNewPlayerModalOpen = activeModal.name === NEW_PLAYER_MODAL;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(showModal({ name: NEW_PLAYER_MODAL }));
  }, []);

  return (
    <div className="App">
      <CustomModal isOpen={isNewPlayerModalOpen}>
        <NewPlayer />
      </CustomModal>
    </div>
  );
}

export default App;
