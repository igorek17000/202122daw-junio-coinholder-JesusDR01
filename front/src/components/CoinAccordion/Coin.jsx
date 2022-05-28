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
import VisibilityOffIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityIcon from '@mui/icons-material/VisibilityOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import { useUpdateCoinMutation } from 'app/services/coins';

export const AccordionCoin = ({ data, isEditable, canHandleVisibility, handleOpenDeleteCoinModal }) => {
  const [expanded, setExpanded] = useState(false);
  const [update] = useUpdateCoinMutation();
  return (
    <StyledCoin >
      {canHandleVisibility &&
        (data.invisible ? (
          <Button
            className="delete-coin"
            variant="contained"
            color="primary"
            onClick={() => update({ id: data._id, invisible: false })}
          >
            <VisibilityIcon />
          </Button>
        ) : (
          <Button
            className="delete-coin"
            variant="contained"
            color="primary"
            onClick={() => update({ id: data._id, invisible:true  })}
          >
            <VisibilityOffIcon />
          </Button>
        ))}

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
        disabled={data.invisible}
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
            <TransactionActions idCoin={data._id} />
            <TransactionsTable transactions={data.transactions} />
          </AccordionDetails>
        )}
      </Accordion>
    </StyledCoin>
  );
};
