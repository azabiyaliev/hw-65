import { useCallback, useEffect, useState } from 'react';
import { IPages, IPagesAPI } from '../../types';
import axiosAPI from '../../axiosAPI.ts';
import Loader from '../../components/UI/Loader/Loader.tsx';
import { useParams } from 'react-router-dom';
import { Grid } from "@mui/joy";
import { Card, CardContent } from '@mui/material';
import Typography from '@mui/material/Typography';


const Home = () => {
  const [pages, setPages] = useState<IPages[]>([]);
  const [loading, setLoading] = useState(false);
  const {pageName} = useParams();

  const fetchData = useCallback(async () => {

    try {
      setLoading(true);
      const response = await axiosAPI.get<IPagesAPI>(
        !pageName ? 'pages.json' : `/pages.json?orderBy="page"&equalTo="${pageName}"`);

      if (response.data) {
        const pagesFromAPI = Object.keys(response.data).map((pageKey) => {
          return {
            ...response.data[pageKey],
            id: pageKey,
          };
        });
        setPages(pagesFromAPI);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [pageName]);

  useEffect(() => {
    void fetchData();
  }, [fetchData]);


  return (
    <>
      {loading ? (<Loader/>) : (<div className="d-flex">
          <div>
            <div> {pages.length === 0 ? (
              <p style={{textAlign: "center"}}>Page empty</p>
            ) : (
              <Grid container spacing={2}>
                {pages.map((page) => (

                  <Grid sx={{mx: "auto"}} xs={10} key={page.page}>
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
                          {`Content: ${page.content}`}
                        </Typography>
                      </CardContent>
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