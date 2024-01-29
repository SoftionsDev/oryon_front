import React, { useState, useEffect } from 'react';
import { Button, styled, Alert, AlertTitle, Grid, Modal, Box } from '@mui/material';
import { getFunction, deleteFunction } from 'app/utils/rest_connector';
import { handleGetInfo, handleDelete } from "../../utils/utils"
import { API_URL } from "../../../constants"
import PaginatedTable from '../../components/PaginatedTable';
import BrmCreator from '../../components/brmCreator';


const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' },
  },
}));


const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
}));

const StyledBox = styled(Box)(({ theme }) => ({
  margin: theme.spacing(1),
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'calc(100% - 200px)',
  backgroundColor: 'white',
  padding: theme.spacing(2),
  boxShadow: theme.shadows[5],
  borderRadius: '5px',
}));


const SERVICE = process.env.REACT_APP_RULES_SERVICE || 'rules'
const SERVICE_FIELDS = process.env.REACT_APP_FIELDS_SERFVICE || 'fields'

const CreateRules = () => {
  const [fields, setFields] = useState([])
  const [open, setOpen] = useState(false)
  const [hasError, setError] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [rules, setRules] = useState([])
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const ruleObject = (data) => {
    const transformedData = data.map((item) => {
      return {
        code: item.id,
        name: item.name,
        manager_percentage: item.manager,
        director_percentage: item.director,
        commercial_percentage: item.commercial,
        assistant_percentage: item.assistant,
        is_active: item.is_active ? 'Si' : 'No'
      }
    })
    return transformedData
  }

  useEffect(() => {
    setError(false)
    setRefresh(false)
    const getFields = async () => {
      const fields = await getFunction(API_URL, SERVICE_FIELDS)
      setFields(fields)
    }
    handleGetInfo(getFunction, API_URL, SERVICE, ruleObject, setRules, setError)
    getFields()
  }, [refresh]);

  const performDelete = async (item) => {
    handleDelete(deleteFunction, API_URL, SERVICE, item.code, setRefresh, setError)
  }

  const columnNames = [
    "Código",
    "Nombre",
    "P. Gerente",
    "P. Director",
    "P. Comercial",
    "P. Asistente",
    "Activa"
  ]

  return (
    <Container>
      {hasError &&
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          Algo ha salido mal, intenta de nuevo
        </Alert>
      }
      <Grid item xs={0} md={0}>
        <StyledButton variant="contained" color="primary" onClick={handleOpen}>
          Nueva Regla
        </StyledButton>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <StyledBox>
            <BrmCreator
              fields={fields}
              url={API_URL}
              service={SERVICE}
              setRefresh={setRefresh}
              handleClose={handleClose}
            />
          </StyledBox>
        </Modal>
      </Grid >
      <PaginatedTable props={
        {
          title: 'Porcentajes Y Equivalencias',
          columnNames: columnNames,
          items: rules,
          actions: [
            {
              icon: "delete",
              color: "error",
              click: performDelete
            }
          ]
        }
      }
      />
    </Container >
  )
}

export default CreateRules;