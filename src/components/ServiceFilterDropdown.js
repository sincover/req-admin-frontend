import ReactSelect from 'react-select';

const options = [
  { value: 'Video', label: 'Video' },
  { value: 'Photo', label: 'Photo' },
  { value: 'Graphics', label: 'Graphics' },
];

const ServiceFilterDropdown = ({ onChange }) => (
  <ReactSelect options={options} onChange={onChange} />
);

export { ServiceFilterDropdown };