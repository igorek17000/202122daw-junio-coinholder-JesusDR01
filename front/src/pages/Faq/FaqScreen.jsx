//@ts-check
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material';
import { FaqMetamaskGuide } from 'components';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyledFaq } from './FaqScreen.styled';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export const FaqScreen = () => {
  const { t } = useTranslation();
  return (
    <StyledFaq>
      <Accordion className="accordion">
        <AccordionSummary id="faq-metamask-guide" expandIcon={<ExpandMoreIcon />}>
          <Box>
            <Typography>{t('faq.mobile')}</Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <FaqMetamaskGuide />
        </AccordionDetails>
      </Accordion>
    </StyledFaq>
  );
};
