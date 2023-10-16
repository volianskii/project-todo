import { GridLoader } from 'react-spinners';

const LOADER_COLOR = '#AAABBB';
const LOADER_SIZE = 30;
function Loader(): JSX.Element {
  return (
    <GridLoader color={LOADER_COLOR} size={LOADER_SIZE} />
  );
}

export default Loader;
