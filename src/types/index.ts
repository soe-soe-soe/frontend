/**
 * Typdefinitionen für das Windprojekt Kalkulator System
 */

// Einzelne Windkraftanlage
export interface Anlage {
  /** Eindeutige ID der Anlage innerhalb des Windparks */
  id: string;
  /** Hersteller der Windkraftanlage */
  hersteller: string;
  /** Modell der Windkraftanlage (abhängig vom Hersteller) */
  modell: string;
  /** Anzahl der Anlagen dieses Typs */
  anzahl: number;
}

// Hauptentität: Windpark
export interface Windpark {
  /** Eindeutige ID des Windparks */
  id: string;
  /** Name des Windpark-Projekts */
  name: string;
  /** Standort (Adresse oder Koordinaten) */
  standort: string;
  /** Datum des Baubeginns */
  baubeginn: Date;
  /** Datum der geplanten Inbetriebnahme */
  inbetriebnahme: Date;
  /** Aktueller Projektstatus */
  status: ProjectStatus;
  /** Prognostizierter jährlicher Gewinn in Euro */
  gewinnProAnnum: number;
  /** Gesamtes Investitionsvolumen in Euro */
  investitionsvolumen: number;
  /** Eigenkapitalquote in Prozent (0-100) */
  ekQuote: number;
  /** Fremdkapitalzinssatz in Prozent */
  fkZins: number;
  /** Return on Investment in Prozent */
  roi: number;
  /** Liste aller Anlagen im Windpark */
  anlagen: Anlage[];
}

export interface WindparkListe{
  /** Liste von Windparks */
  windparks: Windpark[];
}

// Projektstatus Enumeration
export type ProjectStatus = 'Entwurf' | 'Laufend' | 'Abgeschlossen';

// Hersteller-Modell Mapping
export interface HerstellerModelle {
  [hersteller: string]: string[];
}

// KPI Datenstruktur für Dashboard
export interface KPIData {
  /** Anzahl der Projekte mit Status "Laufend" */
  laufendeKalkulationen: number;
  /** Durchschnittlicher jährlicher Gewinn aller Projekte */
  durchschnittlicherGewinn: number;
  /** Durchschnittliche Eigenkapitalquote aller Projekte */
  durchschnittlicheEkQuote: number;
}

// Formular-Zustand für neues Projekt
export interface NewProjectFormData {
  name: string;
  standort: string;
  baubeginn: Date | null;
  inbetriebnahme: Date | null;
  status: ProjectStatus;
  gewinnProAnnum: number;
  investitionsvolumen: number;
  ekQuote: number;
  fkZins: number;
  roi: number;
}

// Validierungsfehler
export interface ValidationErrors {
  [field: string]: string;
}

// Seiten-Navigation
export type PageType = 'overview' | 'new-project';

// Props für Komponenten
export interface OverviewPageProps {
  testWindparks: Windpark[];
  kpis: KPIData;
  onNewProject: () => void;
  handleApiCall: () => Promise<WindparkListe>;
}

export interface NewProjectPageProps {
  onSave: (windpark: Windpark) => void;
  onCancel: () => void;
}

export interface KPICardProps {
  title: string;
  value: string;
  icon?: React.ReactNode;
}

export interface ProjectTableProps {
  windparks: Windpark[];
}