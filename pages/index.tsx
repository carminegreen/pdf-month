import { useState } from 'react'
import useSWR from 'swr'
import {
  Layout,
  Page,
  Button,
  Input,
  Text,
  Link,
  Code,
} from '@vercel/examples-ui'
import fetchAPI from '@lib/fetch-api'
import { MonthName } from "../models/MonthModel";

function Index() {
  const [loading, setLoading] = useState<boolean>(false)
    const [value, setValue] = useState("Gennaio");

  return (
    <Page>
      <div className="text-center mb-6">
        <Text variant="h1" className="mb-4">
          Inserisci il mese
        </Text>
      </div>

      <form
        className="flex flex-col py-8 justify-center items-center"
        onSubmit={async (e) => {
          e.preventDefault()

            const res = await fetch("/api/pdf/generate", {
                method: "POST",
                body: JSON.stringify({ month: value })
            }).then(r => r.blob()).then(r => {
                let url = window.URL.createObjectURL(r);
                let a = document.createElement('a');
                a.href = url;
                a.download = `${value}.pdf`;
                a.click();
                window.URL.revokeObjectURL(url);
            });

          console.log(res)
        }}
      >
          <select
              style={{
                  width: "80%",
                  textAlign: "center",
                  borderRadius: "5px",
                  margin: "1em",
                  height: "6vh"
              }}
              value={value}
              onChange={(e) => {
                  setValue(e.target.value);
              }}
          >
              { Object.values(MonthName).map(r => <option key={r} value={r}>{r}</option>) }
          </select>
        <Button
            type="submit"
            className="ml-4"
            width="120px"
            loading={loading}
            style={{
                margin: "1em",
                marginTop: "3em",
                width: "120px",
                height: "120px",
                borderRadius: "80px",
                backgroundColor: "green"
            }}
        >
          Scarica
        </Button>
      </form>
    </Page>
  )
}

Index.Layout = Layout

export default Index
