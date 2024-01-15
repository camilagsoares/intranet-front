import { useState } from 'react';

export const useModal = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpen = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  // MODAL DELETAR TELEFONE
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
  const [selectedDeleteId,setSelectedDeleteId ] = useState(null);

  const handleDeleteOpen = (id) => {
    console.log(id)
    setSelectedDeleteId(id)
    setModalDeleteOpen(true);
  }


  const handleDeleteClose = () => {
    setModalDeleteOpen(false);
    setSelectedDeleteId(null)
  }

  // MODAL EDITAR TELEFONE
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);

  const handleEditOpen = (id) => {
    console.log(id)

    setSelectedItemId(id);
    setModalEditOpen(true);
  }

  const handleEditClose = () => {
    setSelectedItemId(null);
    setModalEditOpen(false);
  }

  return {
    modalOpen,
    handleOpen,
    handleClose,
    modalDeleteOpen,
    handleDeleteOpen,
    handleDeleteClose,
    modalEditOpen,
    handleEditOpen,
    handleEditClose
  };
};
