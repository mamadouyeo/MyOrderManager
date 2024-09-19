import { ReportHandler } from 'web-vitals';

const reportWebVitals = (onPerfEntry?: ReportHandler) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then((webVitals) => {
      const { getCLS, getFID, getFCP, getLCP, getTTFB } = webVitals as {
        getCLS: (onPerfEntry: ReportHandler) => void;
        getFID: (onPerfEntry: ReportHandler) => void;
        getFCP: (onPerfEntry: ReportHandler) => void;
        getLCP: (onPerfEntry: ReportHandler) => void;
        getTTFB: (onPerfEntry: ReportHandler) => void;
      };
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    }).catch(error => {
      console.error('Erreur lors du chargement des Web Vitals:', error);
    });
  }
};

export default reportWebVitals;
