﻿import { ComponentState } from 'react';


export enum AnalysisDataType  {
    PreprocessData = "PREPROCESS_DATA",
    ClassifyData = "CLASSIFY_DATA",
    TrainPreprocessor = "TRAIN_PREPROCESSOR",
    TrainClassifier = "TRAIN_CLASSIFIER",
    GenerateEER = "GENERATE_EER",
}

export interface AnalysisInput {
    input: string
}

export type AnalysisData = AnalysisDataType  | AnalysisInput;

export interface AnalysisFormState extends ComponentState {
    step: number;
}

interface AnalysisFormPersist {
    saveData: (d: AnalysisData) => void;
}

export interface AnalysisInitialFormData extends AnalysisFormPersist {
    nextStep: () => void;
}

export interface AnalysisFinalFormData extends AnalysisFormPersist {
    previousStep: () => void;
}

export interface AnalysisFormData extends AnalysisInitialFormData, AnalysisFinalFormData {}