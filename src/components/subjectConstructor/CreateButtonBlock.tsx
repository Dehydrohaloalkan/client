import { Button } from '@mui/material';

type Props = {
    setCreateOpen: Function;
};

function CreateButtonBlock({ setCreateOpen }: Props) {
    return (
        <Button
            sx={{
                width: '100%',
                height: 50,
                border: '2px dashed',
                borderColor: 'grey.400',
                transition: 'border-color 0.3s ease-in-out',
                '&:hover': {
                    borderStyle: 'solid',
                    borderWidth: 2,
                    borderColor: 'primary.main',
                    cursor: 'pointer',
                    transition: 'border-color 0.3s ease-in-out',
                },
            }}
            onClick={() => {
                setCreateOpen(true);
            }}
        >
            Create Subject
        </Button>
    );
}

export default CreateButtonBlock;
