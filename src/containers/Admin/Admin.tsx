import Box from '@mui/material/Box';
import { FormControl, InputLabel, NativeSelect, TextField } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { IPages } from '../../types';
import { PAGES } from '../../constants.ts';
import axiosAPI from '../../axiosAPI.ts';
import Loader from '../../components/UI/Loader/Loader.tsx';
import { useNavigate } from 'react-router-dom';

const initialForm = {
  title: "",
  content: "",
  page: ""
};

const PAGES_LIST = PAGES;

const Admin = () => {
  const [form, setForm] = useState<IPages>({ ...initialForm });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const pageName = form.page;

  const fetchPage = useCallback(async () => {

    try {
      setLoading(true);
      const response: { data: IPages } = await axiosAPI<IPages>(
        `pages/${pageName}.json`,
      );
      if (response.data) {
        setForm(response.data);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }, [pageName]);


  useEffect(() => {
    void fetchPage();
  }, [fetchPage]);


  const onChangeField = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (pageName) {
        await axiosAPI.put(`pages/${pageName}.json`, {...form});
      }
      setForm({ ...initialForm });
      navigate(`/pages/${pageName}`);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }

  };

  console.log(form);

  return (
    <>
      {loading ? (<Loader/>) : (<form onSubmit={onSubmitForm}>
          <h1 style={{textAlign: "left", paddingTop: "30px"}}>
            Edit page
          </h1>
          <Box
            sx={{
              py: 3,
              display: "grid",
              gap: 2,
              flexWrap: "wrap",
              width: "100%",
            }}
          >
            <Box sx={{maxWidth: 200}}>
              <FormControl fullWidth>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                  Choose page
                </InputLabel>
                <NativeSelect
                  required
                  value={form.page}
                  name="page"
                  aria-selected={true}
                  onChange={onChangeField}
                >
                  {PAGES_LIST.map((page) => (
                    <option key={page.id} value={page.id}>{page.title}</option>
                  ))}
                </NativeSelect>
              </FormControl>
            </Box>
            <TextField
              sx={{me: "auto", width: "50%"}}
              name="title"
              id="outlined-basic"
              label="Title"
              variant="outlined"
              value={form.title || ""}
              onChange={onChangeField}
            />
            <TextField
              sx={{me: "auto", width: "50%"}}
              name="content"
              id="outlined-multiline-static"
              label="Content"
              multiline
              rows={4}
              value={form.content}
              onChange={onChangeField}
            />
            <Button
              type="submit"
              sx={{me: "auto", width: "5%"}}
              color="inherit"
              variant="outlined"
            >
              Save
            </Button>
          </Box>
        </form>
      )
      }
    </>
  );
};

export default Admin;