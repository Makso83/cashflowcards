import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectPlayersTemplates } from '../../../store/selectors/players';
import { isTemplates } from '../../../utils/randomTemplate';
import CustomButton from '../../CustomButton/CustomButton';
import CustomInput from '../../CustomInput/CustomInput';
import { addPlayer, removeProfessionTemplate } from '../../../store/actions/players';

import styles from './NewPlayer.module.scss';
import { hideModal } from '../../../store/actions/activeModal';
import makeNewPlayer from '../../../utils/makeNewPlayer';

export default () => {
  const [nameValue, setNameValue] = useState('');
  const [nameError, setNameError] = useState(null);

  const templates = useSelector(selectPlayersTemplates);

  const dispatch = useDispatch();

  if (!isTemplates(templates)) {
    return <h2>Больше нет свободных професий</h2>;
  }

  const onSubmit = (evt) => {
    evt.preventDefault();
    if (nameValue.trim() === '') {
      setNameError('Обязательное поле');
      return false;
    }
    const newPlayer = makeNewPlayer(nameValue, templates);
    dispatch(addPlayer(newPlayer));
    dispatch(removeProfessionTemplate(newPlayer.professionId));
    dispatch(hideModal());
    return true;
  };

  const onNameChange = (e) => {
    setNameValue(e.target.value);
  };

  const onNameFocus = () => {
    setNameError(null);
  };

  return (
    <form onSubmit={onSubmit} className={styles.formWrapper}>
      <h2 className={styles.formHeader}>Создание нового игрока</h2>
      <div className={styles.inputWrapper}>
        <CustomInput
          inputName="Name"
          onChange={onNameChange}
          placeholder="Введите имя игрока"
          error={nameError}
          inputValue={nameValue}
          onFocus={onNameFocus}
          autoFocus
        />
      </div>
      <div className={styles.buttonWrapper}>
        <CustomButton buttonText="Создать" buttonType="submit" />
      </div>
    </form>

  );
};
