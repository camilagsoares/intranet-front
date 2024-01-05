import Pagination from '@mui/material/Pagination';
import { useEffect, useState } from 'react';
import { useApiRequestGet } from "../../../services/api"
import Box from '@mui/material/Box';

export const PaginationSecretary = () => {

    const { data } = useApiRequestGet('/secretaria/listar-secretarias')

    console.log(data)

    const [pageNumber, setPageNumber] = useState(0);
    const projectsPerPage = 6;
    const pagesVisited = pageNumber * projectsPerPage;

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    useEffect(() => {
        setPageNumber(0);
    }, [data]);


    return (
        <>
            {data && data.length > 0 && (
                <Box display="flex" justifyContent="end" mt={2} >
                    <Pagination
                        color="primary"
                        count={Math.ceil(data?.length / projectsPerPage)}
                        page={pageNumber + 1}
                        onChange={(event, page) => {
                            changePage({ selected: page - 1 });
                        }}
                        variant="outlined"
                        shape="rounded"
                    />
                </Box>
            )}
        </>
    )
}