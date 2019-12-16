export class SelectChoice{
    name: string;
    display: string;
    value: any;
    reader?: string;
    order?: number;
};
export const example_choices: Array<SelectChoice> = [
    {name: "One", display: "One", value: 1, reader: "One"},
    {name: "Two", display: "Two", value: 2, reader: "Two"},
    {name: "Three", display: "Three", value: 3, reader: "Three"},
    {name: "A", display: "A", value: "A", reader: "A"},
    {name: "B", display: "B", value: "B", reader: "B"},
    {name: "C", display: "C", value: "C", reader: "C"}
];
