import { ComponentState } from 'react';


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

export type AnalysisData = AnalysisDataType | AnalysisInput;

export interface AnalysisConfig {
    type: AnalysisDataType;
}

export interface AnalysisBuilderFormState extends ComponentState {
    step: number;
    type: AnalysisDataType;
}

export interface BaseSchema {
    title: string;
    type: string;
    properties: any;
    definitions: {};
}

export interface AnalysisSchemaFormState extends ComponentState {
    error?: string;
    isLoading: boolean;
    schema?: BaseSchema;
}

interface AnalysisFormPersist {
    analysisType: AnalysisDataType;
    saveData: (d: AnalysisData) => void;
}

export interface AnalysisInitialFormData extends AnalysisFormPersist {
    nextStep: () => void;
}

export interface AnalysisFinalFormData extends AnalysisFormPersist {
    previousStep: () => void;
}

export interface AnalysisFormData extends AnalysisInitialFormData, AnalysisFinalFormData {}