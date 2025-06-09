import React, { useState, useEffect } from 'react';
import MenuItem from '@mui/material/MenuItem';
import { SimpleCard } from '@/app/components';
import { Button, Icon, styled, Alert, AlertTitle } from '@mui/material';
import { Span } from '@/app/components/Typography';
import { ValidatorForm } from 'react-material-ui-form-validator';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { createFunction, updateFunction } from '@/app/utils/rest_connector';
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


const BrmCreator = (props) => {
    const [rule, setRule] = useState(props.rule)
    const [ruleGroups, setRuleGroups] = useState([
        { campo: '', operatorComp: '', valueNumber: '', binaryOperator: '' }
    ]);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        console.log(props.fields)
        concatenateValues()
    }, [ruleGroups])

    const handleChange = (event, index) => {
        const { name, value } = event.target;
        if (!ruleGroups.hasOwnProperty(name)) {
            setRule({ ...rule, [name]: value })
        }
        const updatedGroups = ruleGroups.map((group, i) =>
            i === index ? { ...group, [name]: value } : group
        );
        setRuleGroups(updatedGroups);
    }

    const addNewGroup = () => {
        setRuleGroups([...ruleGroups, { campo: '', operatorComp: '', valuenumber: '', binaryOperator: '' }]);
    }

    const deleteGroup = (index) => {
        const updatedGroups = ruleGroups.filter((_, i) => i !== index);
        setRuleGroups(updatedGroups);
    };

    const concatenateValues = () => {
        const ruleParts = ruleGroups.map((group, index) => {
            let campo = group.campo.toLowerCase()
            let operatorComp = group.operatorComp
            let updatedValue = (
                typeof group.valueNumber === 'string' &&
                    group.valueNumber.includes(' ') ? `"${group.valueNumber}"` : group.valueNumber
            )
            let ruleString = `${campo} ${operatorComp} ${updatedValue}`
            if (index < ruleGroups.length - 1) {
                ruleString += ` ${group.binaryOperator}` || '';
            }
            return ruleString
        });
        setRule({ ...rule, rule: ruleParts.join(' ') })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const body = {
                name: rule.name,
                rule: rule.rule,
                manager: rule.manager,
                director: rule.director,
                commercial: rule.commercial,
                assistant: rule.assistant
            }
            if (props.update) {
                await updateFunction(props.url, props.service, body, rule.id)
            } else {
                await createFunction(props.url, props.service, body)
            }
            props.setRefresh(true)
            setRule({})
            props.handleClose()
        } catch (error) {
            console.log(error);
            setHasError(true);
            props.handleClose()
        }
    };

    const handleError = (event) => {
        console.log(event);
        setHasError(true);
    }
    const hasValues = () => {
        return ruleGroups.some(group => group.campo || group.operatorComp || group.valueNumber);
    }

    useEffect(() => {
        if (props.update && rule) {
            const ruleParts = rule.rule.split(' ')
            const newGroups = []
            const ruleLength = ruleParts.length === 3 ? ruleParts.length : 4
            for (let i = 0; i < ruleParts.length; i += ruleLength) {
                const [_field, accessor] = ruleParts[i].split('.')
                newGroups.push({
                    campo: accessor,
                    operatorComp: ruleParts[i + 1],
                    valueNumber: ruleParts[i + 2],
                    binaryOperator: ruleParts[i + 3] ? ruleParts[i + 3] : ''
                })
            }
            console.log(newGroups)
            setRuleGroups(newGroups)
        }
    }, []);


    return (
        <Container style={{ maxHeight: '75vh', overflowY: 'true' }}>
            <ValidatorForm onSubmit={handleSubmit} onError={handleError}>
                <Button color="primary" variant="contained" type="submit">
                    <Icon>border_color</Icon>
                    <Span sx={{ pl: 1, textTransform: 'capitalize' }}>
                        {props.update ? "Actualizar" : "Crear"}
                    </Span>
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
                        '& .MuiFormControl-root': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <SimpleCard title={props.update ? "Actualizar Regla" : "Creacion de reglas BRM"}>
                        <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                            <TextField
                                label="Nombre"
                                name="name"
                                value={rule.name}
                                onChange={handleChange}
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
                                            {Object.keys(props.fields).map((key) => (
                                                <optgroup key={key} label={key}>
                                                    {props.fields[key].map((value) => (
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
                                        name={`valueNumber`}
                                        multiline
                                        value={group.valueNumber || ''}
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
                                                        <MenuItem value={'and'}>AND</MenuItem>
                                                        <MenuItem value={'or'}>OR</MenuItem>
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
                        </div>
                    </SimpleCard>
                    <p></p>
                    <SimpleCard title="Porcentajes">
                        <TextField
                            label="Porcentaje Manager"
                            name="manager"
                            type='number'
                            value={rule.manager}
                            onChange={handleChange}
                            validators={['required']}
                        />
                        <TextField
                            label="Porcentaje Director"
                            name="director"
                            type='number'
                            value={rule.director}
                            onChange={handleChange}
                            validators={['required']}
                        />
                        <TextField
                            label="Porcentaje Comercial"
                            name="commercial"
                            type='number'
                            value={rule.commercial}
                            onChange={handleChange}
                            validators={['required']}
                        />
                        <TextField
                            label="Porcentaje Asesor"
                            name="assistant"
                            type='number'
                            value={rule.assistant}
                            onChange={handleChange}
                            validators={['required']}
                        />
                    </SimpleCard>
                </Box>
            </ValidatorForm>
        </Container >
    )
}

export default BrmCreator;
