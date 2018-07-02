import { ComponentState } from 'react';

export interface AnalysisFormState extends ComponentState {
    step: number;
}

export interface AnalysisInitialFormData {
    nextStep: () => void;
}

export interface AnalysisFinalFormData {
    previousStep: () => void;
}

export interface AnalysisFormData extends AnalysisInitialFormData, AnalysisFinalFormData {}