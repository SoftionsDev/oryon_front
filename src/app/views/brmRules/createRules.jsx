import React, { useState, useEffect } from 'react';
import MenuItem from '@mui/material/MenuItem';
import { SimpleCard } from 'app/components';
import { Button, Icon, styled, Alert, AlertTitle, Grid } from '@mui/material';
import { Span } from 'app/components/Typography';
import { ValidatorForm } from 'react-material-ui-form-validator';
import { useNavigate } from 'react-router-dom';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { createFunction, getFunction } from 'app/utils/rest_connector';
import { API_URL } from "../../../constants"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' },
  },
}));


const SERVICE = process.env.REACT_APP_RULES_SERVICE || 'rules'
const SERVICE_FIELDS = 'fields'

const CreateRules = () => {
  const [rule, setRule] = useState({ name: '', rule: '', percentage: '', formula: '' });
  const [formula, setFormula] = useState({ operator: '', percentage: '', operator1: '/', percentage1: '100' })
  const navigate = useNavigate();
  const [fields, setFields] = useState({});
  const [hasError, setHasError] = useState(false);
  const [setRefresh] = useState(false)

  const [ruleGroups, setRuleGroups] = useState([
    { campo: '', operatorComp: '', valuenumber: '', binaryOperator: '' }
  ]);

  useEffect(() => {
    concatenateValues();
    const getFields = async () => {
      try {
        const availableFields = await getFunction(API_URL, SERVICE_FIELDS)
        setFields(availableFields)
      } catch (error) {
        console.log(error);
      }
    };
    getFields();
    console.log(rule);
  }, [ruleGroups]);

  const handleChange = (event, index) => {
    const { name, value } = event.target;
    const updatedGroups = ruleGroups.map((group, i) =>
      i === index ? { ...group, [name]: value } : group
    );
    setRuleGroups(updatedGroups);
  }

  const handleRuleChange = (event) => {
    const { name, value } = event.target;
    setRule({ ...rule, [name]: value });
    if (name === 'percentage') {
      setFormula(prevFormula => ({
        ...prevFormula,
        percentage: value
      }));
    }
    console.log(rule)
  };

  const handleFormulaChange = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
    setFormula(prevFormula => ({
      ...prevFormula,
      [name]: value
    }));
    console.log(formula);
  };

  const addNewGroup = () => {
    setRuleGroups([...ruleGroups, { campo: '', operatorComp: '', valuenumber: '', binaryOperator: '' }]);
  };

  const deleteGroup = (index) => {
    const updatedGroups = ruleGroups.filter((_, i) => i !== index);
    setRuleGroups(updatedGroups);
  };

  const concatenateValues = () => {
    const ruleParts = ruleGroups.map((group, index) => {
      let ruleString = `${group.campo} ${group.operatorComp} ${group.valuenumber}`
      if (index < ruleGroups.length - 1) {
        ruleString += ` ${group.binaryOperator} ` || '';
      }
      return ruleString
    });
    setRule({ ...rule, rule: ruleParts.join(' ') })


  };

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const body = {
        'rule': rule.rule,
        'name': rule.name,
        'percentage': rule.percentage,
        'formula': rule.formula
      }
      await createFunction(API_URL, SERVICE, body)
      navigate('/dashboard/rulesList');
      setRefresh(true)
    } catch (error) {
      console.log(error);
      setHasError(true);

    }
  };
  const handleError = (event) => {
    console.log(event);
    setHasError(true);
  };

  const hasValues = () => {
    return ruleGroups.some(group => group.campo || group.operatorComp || group.valuenumber);
  };

  return (
    <Container>
      <ValidatorForm onSubmit={handleSubmit} onError={handleError}>
        <Button color="primary" variant="contained" type="submit">
          <Icon>border_color</Icon>
          <Span sx={{ pl: 1, textTransform: 'capitalize' }}>Crear Reglar (BRM)</Span>
        </Button>
        <p />
        {hasError && (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            Algo ha salido mal, intenta de nuevo
          </Alert>
        )}
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
            '& .MuiFormControl-root': { m: 1, width: '40ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <SimpleCard title="Creacion de reglas BRM">
            <TextField
              label="Nombre"
              name="name"
              value={rule.name}
              onChange={handleRuleChange}
            />
            {ruleGroups.map((group, index) => (
              <div key={index}>
                <FormControl fullWidth>
                  <InputLabel htmlFor={`field-label-${index}`}>Campo</InputLabel>
                  <Select
                    native
                    defaultValue=" "
                    labelId={`field-label-${index}`}
                    name={`campo`}
                    value={group.campo || ''}
                    onChange={(event) => handleChange(event, index)}
                  >
                    <option aria-label="None" value="" />
                    {Object.keys(fields).map((key) => (
                      <optgroup key={key} label={key}>
                        {fields[key].map((value) => (
                          <option key={value} value={`${key}.${value}`}>{value}</option>
                        ))}
                      </optgroup>
                    ))}
                  </Select>
                </FormControl>

                <FormControl fullWidth>
                  <InputLabel id={`operator-comp-label-${index}`}>Operador</InputLabel>
                  <Select
                    labelId={`operator-comp-label-${index}`}
                    name={`operatorComp`}
                    value={group.operatorComp || ''}
                    onChange={(event) => handleChange(event, index)}
                  >
                    <MenuItem value={'<'}>Menor que</MenuItem>
                    <MenuItem value={'<='}>Menor o igual</MenuItem>
                    <MenuItem value={'>'}>Mayor</MenuItem>
                    <MenuItem value={'>='}>Mayor o igual</MenuItem>
                    <MenuItem value={'='}>Igual</MenuItem>
                  </Select>
                </FormControl>

                <TextField
                  label={`Valor ${index + 1}`}
                  name={`valuenumber`}
                  multiline
                  value={group.valuenumber || ''}
                  onChange={(event) => handleChange(event, index)}
                  validators={['required']}
                  errorMessages={['Este Campo es requerido']}
                />
                {ruleGroups.length >= 2 && (
                  <>
                    {index < ruleGroups.length - 1 && (
                      <FormControl fullWidth>
                        <InputLabel id={`binary-operator-${index}`}>Operador Binario</InputLabel>
                        <Select
                          labelId={`binary-operator-${index}`}
                          name={`binaryOperator`}
                          value={group.binaryOperator || ''}
                          onChange={(event) => handleChange(event, index)}
                        >
                          <MenuItem value={'AND'}>AND</MenuItem>
                          <MenuItem value={'OR'}>OR</MenuItem>
                        </Select>
                      </FormControl>
                    )}
                    <Button
                      color="error"
                      variant="contained"
                      onClick={() => deleteGroup(index)}
                      style={{ marginTop: '15px', marginRight: index === ruleGroups.length - 1 ? '10px' : '0px' }}
                    >
                      -
                    </Button>
                  </>
                )}
                {index === ruleGroups.length - 1 && (
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={addNewGroup}
                    style={{ marginTop: '15px' }}
                  >
                    +
                  </Button>
                )}
              </div>
            ))}
            {hasValues() && (
              <Alert severity="info">
                Regla: {rule.rule}
              </Alert>
            )}

          </SimpleCard>
          <p />
          <SimpleCard title="Formulación">
            <Grid container spacing={-1} sx={{ marginBottom: '15px' }}>
              <TextField
                label="Porcentaje"
                name="percentage"
                value={rule.percentage || ''}
                onChange={handleRuleChange}
                type="number"
              />
              <Grid container spacing={-1}>
                <TextField
                  label={`Valor Venta`}
                  name={`amount`}
                  disabled
                />
                <FormControl fullWidth>
                  <InputLabel id={`operator-label`}>Operador</InputLabel>
                  <Select
                    labelId={`operator-label`}
                    name={`operator`}
                    value={formula.operator || ''}
                    onChange={handleFormulaChange}
                  >
                    <MenuItem value={'+'}>+</MenuItem>
                    <MenuItem value={'-'}>-</MenuItem>
                    <MenuItem value={'*'}>*</MenuItem>
                    <MenuItem value={'/'}>/</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  label={`Porcentaje`}
                  name={`percentage`}
                  multiline
                  value={rule.percentage || ''}
                  disabled
                  onChange={handleFormulaChange}
                />
                <TextField
                  name={`divider`}
                  disabled
                  value={formula.divider || '/'}
                  style={{ width: '50px' }}
                  onChange={handleFormulaChange}
                />
                <TextField
                  name={`percent`}
                  disabled
                  value={formula.percent || '100'}
                  style={{ width: '60px' }}
                  onChange={handleFormulaChange}
                />
              </Grid>
            </Grid>
          </SimpleCard>
        </Box>
      </ValidatorForm>
    </Container >
  );
};

export default CreateRules;