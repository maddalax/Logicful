import { config } from 'store/ConfigStore'

function instance() {
  //@ts-ignore
  return fetch ?? this.fetch
}

export function apiEndpoint() {
  return config['API_ENDPOINT']
}

export async function getApi<T>(path: string, fetch: any): Promise<T> {
  const endpoint = apiEndpoint()
  const response = await (fetch ?? instance())(`${endpoint}${path}`)
  if (!response.ok) {
    const body = await response.json()
    throw new Error(body.message)
  }
  const body = await response.json()
  return body as T
}

export async function postApi<T>(path: string, body: any): Promise<T> {
  return await requestApiWithBody<T>('POST', path, body)
}

export async function putApi<T>(path: string, body: any): Promise<T> {
  return await requestApiWithBody<T>('PUT', path, body)
}

export async function deleteApi<T>(path: string, body: any): Promise<T> {
  return await requestApiWithBody<T>('DELETE', path, body)
}

async function requestApiWithBody<T>(method: string, path: string, body: any): Promise<T> {
  const endpoint = apiEndpoint()
  try {
    const response = await instance()(`${endpoint}${path}`, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    console.log(response);
    if (!response.ok) {
      const body = await response.json()
      throw new Error(body.message)
    }

    const result = await response.text()
    if (result === null || result === '') {
      return {} as T
    }
    return JSON.parse(result) as T
  } catch (ex) {
    throw ex;
    return {} as T
  }
}
