import * as React from 'react';
import { WidgetProps } from 'react-jsonschema-form';

export default class ForcedDefaultRadio extends React.Component<WidgetProps> {
    constructor(props: any) {
        super(props);
        console.log("Forced Default Props: ", props);
        this.fieldChanged = this.fieldChanged.bind(this);
    }

    componentDidMount() {
        console.log("schema: ", this.props.schema);
        const { value, schema } = this.props;
        if (value == null && schema.default != null) {
            // set the default if not already set
            this.props.onChange(schema.default);
        }
    }

    private fieldChanged(event: React.FormEvent<HTMLInputElement>) {
        this.props.onChange(event.currentTarget.value === "true");
    }

    public static isChecked(value: boolean, field: boolean): boolean {
        console.log("value: ", value, field);
        return value == field;
    }

    public render() {
        const { value } = this.props;
        return <div className="field-radio-group">
            <div className="radio">
                <label>
                    <span>
                        <input type="radio" value="true" checked={ForcedDefaultRadio.isChecked(value, true)} onChange={this.fieldChanged} />
                        <span>yes</span>
                    </span>
                </label>
            </div>
            <div className="radio">
                <label>
                    <span>
                        <input type="radio" value="false" checked={ForcedDefaultRadio.isChecked(value, false)} onChange={this.fieldChanged} />
                        <span>no</span>
                    </span>
                </label>
            </div>
        </div>
    }
}