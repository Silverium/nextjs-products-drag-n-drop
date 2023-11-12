
import { Template } from '@/types/Templates';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';

const normalizeTemplate = (template: Template): { value: Template; label: string; } => {
    return ({
        value: template,
        label: template.name,
    })
};
const TemplatesSelector: React.FC<{
    templates: Template[];
    // eslint-disable-next-line no-unused-vars
    onSelect: (template: Template) => void;
    selectedTemplate?: Template | null;
}> = ({ templates, onSelect, selectedTemplate }) => {
    const [templateState, setTemplateState] = useState<Template | null>(null);

    useEffect(() => {
        setTemplateState(selectedTemplate || null);
    }, [selectedTemplate]);

    const options = templates.map(normalizeTemplate);

    const handleChange = (selectedOption: { value: Template; label: string } | null) => {
        setTemplateState(selectedOption?.value ?? null);
        if (selectedOption) {
            onSelect(selectedOption.value);
        }
    };

    return (
        <Select
            value={templateState ? { value: templateState, label: templateState.name } : null}
            className='self-center'
            onChange={handleChange}
            options={options}
            defaultValue={options[0]}
        />
    );
};

export default TemplatesSelector;


