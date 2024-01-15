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

   const handleDeleteOpen = () => {
       setModalDeleteOpen(true);
   }


   const handleDeleteClose = () => {
       setModalDeleteOpen(false);
   }

   // MODAL EDITAR TELEFONE
   const [modalEditOpen, setModalEditOpen] = useState(false);

   const handleEditOpen = (idProjeto) => {
       setModalEditOpen(true);
       console.log("btn clicado")
   }

   const handleEditClose = () => {
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
