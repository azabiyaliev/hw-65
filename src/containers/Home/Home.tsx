import { useCallback, useEffect, useState } from 'react';
import { IPages, IPagesAPI } from '../../types';
import axiosAPI from '../../axiosAPI.ts';
import Loader from '../../components/UI/Loader/Loader.tsx';
import { NavLink } from 'react-router-dom';
import { Grid } from "@mui/joy";
import { Card, CardActions, CardContent } from '@mui/material';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';


const Home = () => {
  const [pages, setPages] = useState<IPages[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {

    try {
      setLoading(true);
      const response: { data: IPagesAPI } = await axiosAPI<IPagesAPI>("pages.json");
      if (response.data) {
        const pagesFromAPI = Object.keys(response.data).map((pageKey) => {
          return {
            ...response.data[pageKey],
            id: pageKey,
          };
        });
        setPages(pagesFromAPI);
        console.log(response.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchData();
  }, [fetchData]);

  console.log(pages);

  return (
    <>
      {loading ? (<Loader/>) : (<div className="d-flex">
          <div>
            <div> {pages.length === 0 ? (
              <p className="text-center fs-1">No quotes</p>
            ) : (
              <Grid container spacing={2}>
                {pages.map((page) => (
                  <Grid sx={{mx: "auto"}} xs={8} key={page.id}>
                    <Card sx={{boxShadow: 10, minWidth: 300 }}>
                      <CardContent sx={{alignSelf: "center"}}>
                        <Typography
                          sx={{fontSize: 30, ms: 0, ps: 0,}}
                          variant="body2"
                        >{`From page: ${page.title}`}
                        </Typography>
                        <Typography
                          sx={{fontSize: 30, ms: 0, ps: 0}}
                          variant="body2">
                          {`${page.content}`}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button
                          to={`/quotes/${page.id}/edit`}
                          size="small"
                          component={NavLink}
                        >
                          Refactor
                        </Button>
                        <Button
                          size="small"
                        >
                          Delete
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}</div>
          </div>
        </div>
      )
      }
    </>

  );
};

export default Home;