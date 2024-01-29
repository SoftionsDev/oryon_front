import React, { useState, useEffect } from 'react';
import MenuItem from '@mui/material/MenuItem';
import { SimpleCard } from 'app/components';
import { Button, Icon, styled, Alert, AlertTitle, Grid, Box } from '@mui/material';
import { Span } from 'app/components/Typography';
import { ValidatorForm } from 'react-material-ui-form-validator';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { createFunction } from 'app/utils/rest_connector';
import TextField from '@mui/material/TextField';


const Container = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: { margin: '16px' },
    '& .breadcrumb': {
        marginBottom: '30px',
        [theme.breakpoints.down('sm')]: { marginBottom: '16px' },
    },
}));


const CreateFormulas = (props) => {
    const [formulaGroup, setFormulaGroup] = useState(
        { operator: '', percentage: '', operator1: '/', percentage1: '100' }
    )
    const [formula, setFormula] = useState({
        formula: '', percentage: '', rule: ''
    })
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        concatenateValues()
    }, [formulaGroup]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (Object.keys(formula).includes(name)) {
            if (name === 'percentage') {
                const selectedRule = props.rules.find(rule => rule.code === formula.rule?.code);
                const percentageValue = selectedRule ? selectedRule.percentages[value] : '';
                setFormula({ ...formula, [name]: percentageValue });
            } else {
                setFormula((prevFormula) => {
                    const updatedFormula = { ...prevFormula, [name]: value }
                    if (name === 'rule') {
                        const selectedRule = props.rules.find(rule => rule.rule === value)
                        updatedFormula.rule = selectedRule || null
                    }
                    return updatedFormula
                });
            }
        }
        setFormulaGroup({ ...formulaGroup, [name]: value });
    }

    const concatenateValues = () => {
        const formulaString = `${formulaGroup.operator} percentages.${formulaGroup.percentage}${formulaGroup.operator1}${formulaGroup.percentage1}`
        setFormula({ ...formula, formula: formulaString })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const body = {
                percentage: formula.percentage,
                formula: formula.formula,
                rule: formula.rule.code
            }
            await createFunction(props.url, props.service, body)
            props.handleClose()
            props.setRefresh(true)
        } catch (error) {
            console.log(error);
            setHasError(true);
            props.handleClose()
        }
    };
    const handleError = (event) => {
        console.log(event);
        setHasError(true);
    };

    return (
        <Container>
            <ValidatorForm onSubmit={handleSubmit} onError={handleError}>
                <Button color="primary" variant="contained" type="submit">
                    <Icon>border_color</Icon>
                    <Span sx={{ pl: 1, textTransform: 'capitalize' }}>Crear</Span>
                </Button>
                <p />
                {hasError && (
                    <Alert severity="error">
                        <AlertTitle>Error</AlertTitle>
                        Algo ha salido mal, intenta de nuevo
                    </Alert>
                )}
                <SimpleCard title="Formulación">
                    <Grid container spacing={-1} sx={{ mb: "10px" }}>
                        <Grid item xs={4}>
                            <FormControl fullWidth>
                                <InputLabel id={`operator-label`}>Regla</InputLabel>
                                <Select
                                    labelId="operator-label"
                                    name="rule"
                                    value={formula.rule?.rule || ''}
                                    onChange={handleChange}
                                >
                                    {props.rules.map((rule) => (
                                        <MenuItem key={rule.code} value={rule.rule}>
                                            {rule.rule}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid container spacing={-1}>
                        <Box sx={{ '& > :not(style)': { m: 1, width: { xs: '100%', sm: '250px' } } }}>
                            <TextField
                                label={`Valor Venta`}
                                name={`amount`}
                                disabled
                                sx={{ marginBottom: "10px" }}
                            />
                            <FormControl>
                                <InputLabel id={`operator-label`}>Operador</InputLabel>
                                <Select
                                    labelId={`operator-label`}
                                    name={`operator`}
                                    value={formulaGroup.operator || ''}
                                    onChange={handleChange}
                                >
                                    <MenuItem value={'+'}>+</MenuItem>
                                    <MenuItem value={'-'}>-</MenuItem>
                                    <MenuItem value={'*'}>*</MenuItem>
                                    <MenuItem value={'/'}>/</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl>
                                <InputLabel id={`operator-label`}>Porcentaje</InputLabel>
                                <Select
                                    labelId={`operator-label`}
                                    name={`percentage`}
                                    value={formulaGroup.percentage || ''}
                                    onChange={handleChange}
                                >
                                    {props.rules.filter(rule => rule.code === formula.rule?.code).map((rule) => (
                                        Object.entries(rule.percentages).map(([key, value]) => (
                                            <MenuItem key={key} value={key}>
                                                {key} = {value}
                                            </MenuItem>
                                        ))
                                    ))}
                                </Select>
                            </FormControl>
                            <TextField
                                name={`divider`}
                                disabled
                                value={formulaGroup.operator1 || '/'}
                                onChange={handleChange}
                            />
                            <TextField
                                name={`percentage1`}
                                disabled
                                value={formulaGroup.percentage1 || '100'}
                                onChange={handleChange}
                            />
                        </Box>
                    </Grid>
                </SimpleCard>
            </ValidatorForm>
        </Container >
    );
};

export default CreateFormulas;