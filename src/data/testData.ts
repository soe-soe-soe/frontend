import { Windpark, HerstellerModelle } from '../types';

/**
 * Vordefinierte Hersteller und ihre verfügbaren Modelle
 * Basiert auf realen Windkraftanlagen-Herstellern und Modellen
 */
export const herstellerModelle: HerstellerModelle = {
  'Vestas': [
    'V112-3.0',
    'V117-3.45', 
    'V136-3.45',
    'V150-4.2',
    'V162-5.6',
    'V164-10.0'
  ],
  'Siemens Gamesa': [
    'SG 5.8-170',
    'SG 6.6-170',
    'SG 8.0-167',
    'SG 11.0-200',
    'SG 14-222'
  ],
  'Nordex': [
    'N100/3300',
    'N131/3900',
    'N149/4.0-4.5',
    'N163/5.X',
    'N175/6.X'
  ],
  'Enercon': [
    'E-115 EP3',
    'E-138 EP3',
    'E-147 EP3',
    'E-160 EP5',
    'E-175 EP5'
  ],
  'GE Renewable Energy': [
    'GE 2.5-120',
    'GE 3.2-130',
    'Haliade-X 12-220',
    'Haliade-X 13-220'
  ]
};

/**
 * Initiale Testdaten für Windpark-Projekte
 * Repräsentiert realistische Windprojekte in Deutschland
 */
export const initialWindparks: Windpark[] = [
  {
    id: '1',
    name: 'Windpark Nordsee Alpha_T',
    standort: 'Husum, Schleswig-Holstein',
    baubeginn: new Date('2023-03-15'),
    inbetriebnahme: new Date('2024-11-30'),
    anlagen: [
      { 
        id: '1', 
        hersteller: 'Vestas', 
        modell: 'V150-4.2', 
        anzahl: 12 
      },
      { 
        id: '2', 
        hersteller: 'Vestas', 
        modell: 'V136-3.45', 
        anzahl: 8 
      }
    ],
    status: 'Laufend',
    gewinnProAnnum: 2850000,
    investitionsvolumen: 45000000,
    ekQuote: 35.0,
    fkZins: 4.2,
    roi: 8.5
  },
  {
    id: '2',
    name: 'Windpark Eifel Süd_T',
    standort: 'Bad Münstereifel, Nordrhein-Westfalen',
    baubeginn: new Date('2024-01-10'),
    inbetriebnahme: new Date('2025-09-15'),
    anlagen: [
      { 
        id: '1', 
        hersteller: 'Siemens Gamesa', 
        modell: 'SG 6.6-170', 
        anzahl: 15 
      }
    ],
    status: 'Laufend',
    gewinnProAnnum: 3200000,
    investitionsvolumen: 52000000,
    ekQuote: 40.0,
    fkZins: 3.8,
    roi: 9.2
  },
  {
    id: '3',
    name: 'Offshore Windpark Baltic_T',
    standort: 'Ostsee, vor Rügen',
    baubeginn: new Date('2022-06-01'),
    inbetriebnahme: new Date('2023-12-20'),
    anlagen: [
      { 
        id: '1', 
        hersteller: 'Siemens Gamesa', 
        modell: 'SG 11.0-200', 
        anzahl: 25 
      }
    ],
    status: 'Abgeschlossen',
    gewinnProAnnum: 8750000,
    investitionsvolumen: 125000000,
    ekQuote: 30.0,
    fkZins: 4.5,
    roi: 11.8
  },
  {
    id: '4',
    name: 'Windpark Brandenburg Ost_T',
    standort: 'Frankfurt (Oder), Brandenburg',
    baubeginn: new Date('2024-08-01'),
    inbetriebnahme: new Date('2025-12-31'),
    anlagen: [
      { 
        id: '1', 
        hersteller: 'Nordex', 
        modell: 'N149/4.0-4.5', 
        anzahl: 10 
      },
      { 
        id: '2', 
        hersteller: 'Nordex', 
        modell: 'N163/5.X', 
        anzahl: 6 
      }
    ],
    status: 'Entwurf',
    gewinnProAnnum: 2100000,
    investitionsvolumen: 38000000,
    ekQuote: 45.0,
    fkZins: 3.5,
    roi: 7.8
  },
  {
    id: '5',
    name: 'Windpark Harz Plateau_T',
    standort: 'Goslar, Niedersachsen',
    baubeginn: new Date('2023-09-15'),
    inbetriebnahme: new Date('2024-08-30'),
    anlagen: [
      { 
        id: '1', 
        hersteller: 'Enercon', 
        modell: 'E-147 EP3', 
        anzahl: 18 
      }
    ],
    status: 'Laufend',
    gewinnProAnnum: 3450000,
    investitionsvolumen: 58000000,
    ekQuote: 38.0,
    fkZins: 4.0,
    roi: 8.9
  },
  {
    id: '6',
    name: 'Windpark Offshore Bremen_T',
    standort: 'Deutsche Bucht, Nordsee',
    baubeginn: new Date('2024-04-01'),
    inbetriebnahme: new Date('2026-03-31'),
    anlagen: [
      { 
        id: '1', 
        hersteller: 'GE Renewable Energy', 
        modell: 'Haliade-X 13-220', 
        anzahl: 30 
      }
    ],
    status: 'Laufend',
    gewinnProAnnum: 12500000,
    investitionsvolumen: 180000000,
    ekQuote: 25.0,
    fkZins: 5.0,
    roi: 13.2
  }
];

/**
 * Verfügbare Projektstatus-Optionen
 */
export const statusOptionen = ['Entwurf', 'Laufend', 'Abgeschlossen'] as const;