import { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { TransactionsTable } from 'components/TransactionsTable/TransactionsTable';
import { StyledCoin } from './Coin.styled';
import { TransactionActions } from '../TransactionActions/TransactionActions';
import { CoinHeader } from 'components/CoinHeader/CoinHeader';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';


export const AccordionCoin = ({ data, isEditable, handleOpenDeleteCoinModal }) => {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <StyledCoin>
      {isEditable && (
        <Button
          className="delete-coin"
          variant="contained"
          color="error"
           onClick={() => handleOpenDeleteCoinModal(data._id)}
        >
          <DeleteIcon />
        </Button>
      )}
      <Accordion
      
        className="accordion"
        expanded={isEditable ? expanded : false}
        onChange={(_, expanded) => {
          setExpanded(expanded);
        }}
      >
        <AccordionSummary
          expandIcon={isEditable ? <ExpandMoreIcon /> : null}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <CoinHeader data={data} />
        </AccordionSummary>
        {isEditable && (
          <AccordionDetails>
            <TransactionActions idCoin={data._id}/>
            <TransactionsTable transactions={data.transactions} />
          </AccordionDetails>
        )}
      </Accordion>
    </StyledCoin>
  );
};
