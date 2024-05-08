import React, { useState, useEffect } from 'react';
import { Button, styled, Alert, AlertTitle, Grid, Modal, Box } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { getFunction, deleteFunction } from 'app/utils/rest_connector';
import { handleGetInfo, handleDelete, getBackendRoutes } from "../../utils/utils"
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

const ROUTES = getBackendRoutes()

const CreateRules = () => {
  const [fields, setFields] = useState([])
  const [open, setOpen] = useState(false)
  const [hasError, setError] = useState(false)
  const [refresh, setRefresh] = useState(false)
  const [rules, setRules] = useState([])
  const [rule, setRule] = useState({})
  const [update, setUpdate] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)
    setRule({})
    setUpdate(false)
  }

  const ruleObject = (data) => {
    const transformedData = data.map((item) => {
      return {
        code: item.id,
        name: item.name,
        hasFormula: item.has_formula,
        rule: item.rule,
        managerPercentage: item.percentages.manager,
        directorPercentage: item.percentages.director,
        commercialPercentage: item.percentages.commercial,
        assistantPercentage: item.percentages.assistant,
        is_active: item.is_active ? 'Si' : 'No'
      }
    })
    return transformedData
  }

  useEffect(() => {
    setError(false)
    setRefresh(false)
    const getFields = async () => {
      const fields = await getFunction(API_URL, ROUTES.fields)
      setFields(fields)
    }
    handleGetInfo(getFunction, API_URL, ROUTES.rules, ruleObject, setRules, setError)
    getFields()
  }, [refresh]);

  const performDelete = async (item) => {
    handleDelete(deleteFunction, API_URL, ROUTES.rules, item.code, setRefresh, setError)
  }

  const performUpdate = (item) => {
    console.log(item)
    const itemToUpdate = { ...item }
    itemToUpdate.manager = item.manager_percentage
    itemToUpdate.director = item.director_percentage
    itemToUpdate.commercial = item.commercial_percentage
    itemToUpdate.assistant = item.assistant_percentage
    setRule(itemToUpdate)
    setUpdate(true)
    handleOpen()
  }

  const columnNames = [
    { label: "Código", accessor: "code", hidden: true },
    { label: "Nombre", accessor: "name" },
    { label: "Regla", accessor: "rule", hidden: true },
    { label: "P. Gerente", accessor: "managerPercentage" },
    { label: "P. Director", accessor: "directorPercentage" },
    { label: "P. Comercial", accessor: "commercialPercentage" },
    { label: "P. Asistente", accessor: "assistantPercentage" },
    { label: "Activa", accessor: "is_active" }
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
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
            <BrmCreator
              fields={fields}
              url={API_URL}
              rule={rule || {}}
              update={update}
              service={ROUTES.rules}
              setRefresh={setRefresh}
              handleClose={handleClose}
            />
            <Box style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <StyledButton
                variant="contained"
                color="error"
                onClick={handleClose}
                sx={{ ml: 2 }}
              >
                Cancelar
              </StyledButton>
            </Box>
          </StyledBox>
        </Modal>
      </Grid >
      <PaginatedTable props={
        {
          title: 'Porcentajes Y Equivalencias',
          columnNames: columnNames,
          items: rules,
          filters: [],
          actions: [
            /*
            {
              icon: "edit",
              color: "primary",
              click: performUpdate
            },
            */
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