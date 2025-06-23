import React from 'react';
import {
  Paper,
  Typography,
  Box,
  Container,
  Grid,
  TextField,
  Divider,
} from '@mui/material';

import { ProjectDetailPageProps } from '../../types';
import ProjectHeader from '../common/ProjectHeader';
import ProjectTabs from '../common/TabPanel';
import CostTable from '../common/CostTable';
import CollapsibleSection from '../common/CollapsibleSection';
import { formatCurrency, formatNumberWithoutDecimals } from '../../utils/formatters';

/**
 * Project Costs Page Component
 * Detailansicht der Kosten eines Windpark-Projekts
 */
const ProjectCosts: React.FC<ProjectDetailPageProps> = ({ project, onBack, onTabChange, currentTab }) => {
  // Beispielwerte für Kosten
  const einzelpreis = 2800000; // €2.8M pro Anlage
  const gesamtAnlagen = project.anlagen.reduce((sum, anlage) => sum + anlage.anzahl, 0);
  const gesamtkostenAnlagen = gesamtAnlagen * einzelpreis;

  // Daten für CostTable vorbereiten
  const anlagenTableData = project.anlagen.map(anlage => ({
    id: anlage.id,
    name: `${anlage.hersteller} ${anlage.modell}`,
    unitPrice: einzelpreis,
    quantity: anlage.anzahl,
    totalCost: anlage.anzahl * einzelpreis
  }));

  // Gesamtkosten für jeden Abschnitt berechnen
  const infrastrukturKosten = 450000 + 320000 + 180000 + 0; // 950.000 €
  const planungGenehmigungKosten = 25000 + 15000 + 35000 + 120000 + 45000 + 18000; // 258.000 €
  const bauueberwachungKosten = 85000 + 140000 + 25000; // 250.000 €
  
  // Betriebskosten (jährlich)
  const wartungKosten = 45000 + 18000 + 12000; // 75.000 €/Jahr (ohne Indexierung)
  const versicherungKosten = 22000 + 8500; // 30.500 €/Jahr
  const abgabenKosten = 3500; // 3.500 €/Jahr (ohne Kommunalabgabe, da pro kWh)

  // Gesamtsummen für Hauptabschnitte
  const gesamtInvestitionskosten = gesamtkostenAnlagen + infrastrukturKosten + planungGenehmigungKosten + bauueberwachungKosten;
  const gesamtBetriebskosten = wartungKosten + versicherungKosten + abgabenKosten; // Pro Jahr

  return (
    <Container maxWidth="xl">
      {/* Header */}
      <ProjectHeader 
        name={project.name} 
        status={project.status} 
        onBack={onBack}
        showBackButton={true}
      />

      {/* Tabs */}
      <ProjectTabs onTabChange={onTabChange} currentTab={currentTab} />

      {/* Content */}
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box sx={{ py: 3 }}>
          
          {/* 2-spaltiges Layout */}
          <Grid container spacing={4} sx={{ width: '100%' }}>
            
            {/* Linke Spalte: INVESTITIONSKOSTEN */}
            <Grid item xs={12} lg={6} sx={{ minWidth: 0, maxWidth: { lg: '50%' } }}>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                mb: 3,
                py: 1,
                px: 2,
                borderRadius: 1,
                backgroundColor: 'rgba(25, 118, 210, 0.08)'
              }}>
                <Typography variant="h6" sx={{ fontWeight: 600, textTransform: 'none' }}>
                  Investitionskosten
                </Typography>
                <Typography sx={{
                  fontWeight: 600,
                  fontSize: '1rem',
                  color: 'primary.main',
                  fontFamily: 'monospace'
                }}>
                  {formatCurrency(gesamtInvestitionskosten)}
                </Typography>
              </Box>

              {/* Windenergieanlage */}
              <CollapsibleSection title="Windenergieanlage" totalCost={formatCurrency(gesamtkostenAnlagen)}>
                <CostTable 
                  items={anlagenTableData}
                  totalSum={gesamtkostenAnlagen}
                />
              </CollapsibleSection>

              {/* Infrastruktur */}
              <CollapsibleSection title="Infrastruktur" totalCost={formatCurrency(infrastrukturKosten)}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Zuwegung & Wegeausbau"
                      placeholder="€/Pauschal oder €/km"
                      value="450.000 €"
                      InputProps={{ readOnly: true }}
                    />
                    <TextField sx={{ mt: 3 }}
                      fullWidth
                      label="Kabeltrassen & Tiefbau"
                      placeholder="€/km oder Gesamtbetrag"
                      value="320.000 €"
                      InputProps={{ readOnly: true }}
                    />
                    <TextField sx={{ mt: 3 }}
                      fullWidth
                      label="Netzanschluss & Übergabestation"
                      value="180.000 €"
                      InputProps={{ readOnly: true }}
                    />
                    <TextField sx={{ mt: 3 }}
                      fullWidth
                      label="Umspannwerk (falls notwendig)"
                      value="0 €"
                      InputProps={{ readOnly: true }}
                    />
                  </Grid>
                </Grid>
              </CollapsibleSection>

              {/* Planung & Genehmigung */}
              <CollapsibleSection title="Planung & Genehmigung" totalCost={formatCurrency(planungGenehmigungKosten)}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Gutachten (Schall, Schatten, Avifauna)"
                      multiline
                      rows={3}
                      value={`Schallgutachten: 25.000 €
Schattenwurfgutachten: 15.000 €
Avifauna-Gutachten: 35.000 €`}
                      InputProps={{ readOnly: true }}
                    />
                    <TextField sx={{ mt: 3 }}
                      fullWidth
                      label="Projektentwicklungskosten"
                      value="120.000 €"
                      InputProps={{ readOnly: true }}
                    />
                    <TextField sx={{ mt: 3 }}
                      fullWidth
                      label="BImSchG-Antrag & Genehmigung"
                      value="45.000 €"
                      InputProps={{ readOnly: true }}
                    />
                    <TextField sx={{ mt: 3 }}
                      fullWidth
                      label="Behördengebühren"
                      value="18.000 €"
                      InputProps={{ readOnly: true }}
                    />
                  </Grid>
                </Grid>
              </CollapsibleSection>

              {/* Bauüberwachung */}
              <CollapsibleSection title="Bauüberwachung" totalCost={formatCurrency(bauueberwachungKosten)}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Bauleitung"
                      value="85.000 €"
                      InputProps={{ readOnly: true }}
                    />
                    <TextField sx={{ mt: 3 }}
                      fullWidth
                      label="Baurisiken (Puffer)"
                      placeholder="% oder €"
                      value="5% (140.000 €)"
                      InputProps={{ readOnly: true }}
                    />
                    <TextField sx={{ mt: 3 }}
                      fullWidth
                      label="Montageversicherung"
                      value="25.000 €"
                      InputProps={{ readOnly: true }}
                    />
                  </Grid>
                </Grid>
              </CollapsibleSection>
            </Grid>

            {/* Rechte Spalte: BETRIEBSKOSTEN */}
            <Grid item xs={12} lg={6} sx={{ minWidth: 0, maxWidth: { lg: '50%' } }}>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                mb: 3,
                py: 1,
                px: 2,
                borderRadius: 1,
                backgroundColor: 'rgba(25, 118, 210, 0.08)'
              }}>
                <Typography variant="h6" sx={{ fontWeight: 600, textTransform: 'none' }}>
                  Betriebskosten
                </Typography>
                <Typography sx={{
                  fontWeight: 600,
                  fontSize: '1rem',
                  color: 'primary.main',
                  fontFamily: 'monospace'
                }}>
                  {formatCurrency(gesamtBetriebskosten)}/Jahr
                </Typography>
              </Box>

              {/* Wartung */}
              <CollapsibleSection title="Wartung" totalCost={formatCurrency(wartungKosten) + "/Jahr"}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Wartungsvertrag (jährlich)"
                      value="45.000 €/Jahr"
                      InputProps={{ readOnly: true }}
                    />
                    <TextField sx={{ mt: 3 }}
                      fullWidth
                      label="Monitoring & Betriebsführung"
                      value="18.000 €/Jahr"
                      InputProps={{ readOnly: true }}
                    />
                    <TextField sx={{ mt: 3 }}
                      fullWidth
                      label="Pachtkosten"
                      value="12.000 €/Jahr"
                      InputProps={{ readOnly: true }}
                    />
                    <TextField sx={{ mt: 3 }}
                      fullWidth
                      label="Kostenindexierung"
                      value="2,5 %/Jahr"
                      InputProps={{ readOnly: true }}
                    />
                  </Grid>
                </Grid>
              </CollapsibleSection>

              {/* Versicherungen */}
              <CollapsibleSection title="Versicherungen" totalCost={formatCurrency(versicherungKosten) + "/Jahr"}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Versicherungen (Haftpflicht, Maschinenbruch)"
                      value="22.000 €/Jahr"
                      InputProps={{ readOnly: true }}
                    />
                    <TextField sx={{ mt: 3 }}
                      fullWidth
                      label="Betriebsunterbrechungsversicherung"
                      placeholder="Optional"
                      value="8.500 €/Jahr"
                      InputProps={{ readOnly: true }}
                    />
                  </Grid>
                </Grid>
              </CollapsibleSection>

              {/* Abgaben */}
              <CollapsibleSection title="Abgaben" totalCost={formatCurrency(abgabenKosten) + "/Jahr"}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Kommunalabgabe nach EEG §6"
                      placeholder="€/kWh oder € pauschal"
                      value="0,002 €/kWh"
                      InputProps={{ readOnly: true }}
                    />
                    <TextField sx={{ mt: 3 }}
                      fullWidth
                      label="Sonstige laufende Gebühren"
                      value="3.500 €/Jahr"
                      InputProps={{ readOnly: true }}
                    />
                  </Grid>
                </Grid>
              </CollapsibleSection>
            </Grid>

          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default ProjectCosts; 