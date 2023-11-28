const { formatSQL, pool } = require('../db/connection')

async function executeSql(sql) {
  let result
  
  try {
    result = await pool.promise().query(sql)
  } catch (err) {
    console.log(err)
  } finally {
    return result
  }
}

async function createEndpoint(input) {
  let results, output
  let paging = {
    pagingData: setPagingData(input.request)
  }

  try {
    results = await executeSql(input.SQL)
    paging.results = results[0]
    output = formatOutput(paging)
  } catch (error) {
    output = { function: "createEndpoint", resource: input.endpoint, error: error.message }
    console.log(output)
  } finally {
    return output
  }
}

async function testTemplate(req, res) {
  let endpointData = {
    endpoint: "/test",
    SQL: "show tables",
    request: req
  }

  let endpoint = await createEndpoint(endpointData)
  console.log(endpoint)
  if (endpoint.error) {
    res.status(500).json(endpoint)
  } else {
    res.json(endpoint)
  }
}

const audioList = async (req, res) => {
  // let SQL, results, output

  // let paging = {
  //   pagingData: setPagingData(req)
  // }

  // try {
  //   SQL=`SELECT * FROM ntt_recordings`
  //   results = await executeSql(SQL)
  //   paging.results = results[0]
  //   output = formatOutput(paging)
  //   res.json(output)
  // } catch (error) {
  //   res.status(500).json({ error: error.message })
  //   console.log(error)
  // }
  let endpointData = {
    endpoint: "/audio/all",
    SQL: "SELECT * FROM ntt_recordings",
    request: req
  }

  let endpoint = await createEndpoint(endpointData)
  
  if (endpoint.error) {
    res.status(500).json(endpoint)
  } else {
    res.json(endpoint)
  }

}

const recordingNumber = async (req, res) => {
  try {
    SQL=`SELECT * FROM ntt_recordings WHERE objid = ?`
    SQL = formatSQL(SQL, req.params.id)
    rows = await executeSql(SQL)
    results = rows[0]
    res.json(results)
  } catch(error) {
    res.status(500).json({ error: error.message })
    console.log(error)
  }
}

async function allRecordingRegions(req, res) {
  let SQL, results, output

  let paging = {
    pagingData: setPagingData(req)
  }

  SQL = `SELECT * FROM ntt_recording_regions WHERE recording_id = ? ORDER BY recording_id`
  SQL = formatSQL(SQL, [req.params.id])

  try {
    results = await executeSql(SQL)
    paging.results = results[0]
    output = formatOutput(paging)
    res.json(output)    
  } catch (error) {
    res.status(500).json({ error: error.message })
    console.log(error)
  }

}

async function recordingRegion(req, res) {
  let SQL, results

  SQL = `SELECT * FROM ntt_recording_regions WHERE objid = ?`
  SQL = formatSQL(SQL, [req.params.regionId])
  try {
    results = await executeSql(SQL)
    res.status(200).json(results[0])
  } catch (error) {
    res.status(500).json({error: error.message})
    console.log(error)
  }
}

async function recordingsForYear(req, res) {
  let SQL, results, output

  let paging = {
    pagingData: setPagingData(req)
  }

  SQL = 'SELECT * FROM ntt_recordings WHERE recording_date like ?'
  SQL = formatSQL(SQL, [`%${req.params.year}%`])

  try {
    results = await executeSql(SQL)
    paging.results = results[0]
    output = formatOutput(paging)
    res.json(output)    
  } catch(error) {
    res.status(500).json({error: error.message})
    console.log(error)
  }
}

async function regionsForYear(req, res) {
  let SQL, results, output

  let paging = {
    pagingData: setPagingData(req)
  }

  SQL = `SELECT 
    objid,
    recording_id,
    recording_info,
    description,
    subject,
    detail1,
    detail2,
    start_time,
    end_time,
    end_time_post
  FROM 
    ntt_recording_regions 
  WHERE 
    recording_id IN (SELECT objid FROM ntt_recordings WHERE recording_date like ?)`
  
  SQL = formatSQL(SQL, [`%${req.params.year}%`])

  try {
    results = await executeSql(SQL)
    paging.results = results[0]
    output = formatOutput(paging)
    res.json(output)    
  } catch(error) {
    res.status(500).json({ error: error.message})
    console.log(error)
  }
}

async function callersForYear(req, res) {
  let SQL, results, output

  let paging = {
    pagingData: setPagingData(req)
  }

  SQL = `SELECT 
    objid,
    recording_id,
    recording_info,
    description,
    subject,
    detail1,
    detail2,
    start_time,
    end_time,
    end_time_post
  FROM 
    ntt_recording_regions 
  WHERE 
    recording_id IN (SELECT objid FROM ntt_recordings WHERE recording_date like ?)
  AND
    description like 'Caller%'`
  SQL = formatSQL(SQL, [`%${req.params.year}%`])
  console.log(SQL)
  try {
    results = await executeSql(SQL)
    paging.results = results[0]
    output = formatOutput(paging)
    res.json(output)    
  } catch(error) {
    res.status(500).json({error: error.message})
  }
}

async function readingsForYear(req, res) {
  let SQL, results, output

  let paging = {
    pagingData: setPagingData(req)
  }

  SQL = `SELECT 
    objid,
    recording_id,
    recording_info,
    description,
    subject,
    detail1,
    detail2,
    start_time,
    end_time,
    end_time_post
  FROM 
    ntt_recording_regions 
  WHERE 
    recording_id IN (SELECT objid FROM ntt_recordings WHERE recording_date like ?)
  AND
    description like 'Read%'`
  SQL = formatSQL(SQL, [`%${req.params.year}%`])
  console.log(SQL)
  try {
    results = await executeSql(SQL)
    paging.results = results[0]
    output = formatOutput(paging)
    res.json(output)    
  } catch(error) {
    res.status(500).json({error: error.message})
  }
}

async function lecturesForYear(req, res) {
  let SQL, results, output

  let paging = {
    pagingData: setPagingData(req)
  }

  SQL = `SELECT 
    objid,
    recording_id,
    recording_info,
    description,
    subject,
    detail1,
    detail2,
    start_time,
    end_time,
    end_time_post
  FROM 
    ntt_recording_regions 
  WHERE 
    recording_id IN (SELECT objid FROM ntt_recordings WHERE recording_date like ?)
  AND
    description like 'Lect%'`
  SQL = formatSQL(SQL, [`%${req.params.year}%`])

  try {
    results = await executeSql(SQL)
    paging.results = results[0]
    output = formatOutput(paging)
    res.json(output)  
  } catch(error) {
    res.status(500).json({error: error.message})
  }
}

async function topCalls(req, res) {
  let SQL, results, output

  let paging = {
    pagingData: setPagingData(req)
  }


  SQL = ` SELECT 
    objid,
    recording_id,
    recording_info,
    description,
    subject,
    detail1,
    detail2,
    start_time,
    end_time,
    end_time_post
  FROM 
    ntt_recording_regions 
  WHERE 
    recording_id IN (SELECT objid FROM ntt_recordings WHERE top_call = 1)
  AND (description like 'Caller%' OR description like 'Lecture%' OR description like 'Reading%')  
  `
  try {
    results = await executeSql(SQL)
    paging.results = results[0]
    output = formatOutput(paging)

    // res.json(results[0])
    res.json(output)
  } catch(error) {
    res.status(500).json({error: error.message})
    console.log(error)
  }
}

function setPagingData(input) {
  let pages, limit
  if (Object.keys(input.query).length > 0) {
    pages = input.query.page
    limit = input.query.limit
  } else {
    pages = 1
    limit = 50
  }

  return {
    totalPages: pages,
    recordlimit: limit,
    protocol: input.protocol,
    host: input.get('Host'),
    baseUrl: input.baseUrl,
    path: input.path
  }

  // return data
}

function formatOutput(input) {
  let inputPages = (input.pagingData.totalPages) ? input.pagingData.totalPages : 1
  let inputlimit = (input.pagingData.recordlimit) ? input.pagingData.recordlimit : 50
  let protocol = input.pagingData.protocol
  let host = input.pagingData.host
  let baseUrl = input.pagingData.baseUrl
  let path = input.pagingData.path

  const pageMax = 50
  const page = (inputPages) ? parseInt(inputPages) : 1
  const limit = (inputlimit > pageMax) ? parseInt(inputlimit) : pageMax
  const startIndex = (page - 1) * limit
  const endIndex = page * limit
  
  let data = {
    "Total Results": input.results.length,
    "Results per page": `${limit} - Max ${pageMax} results per page`,
    next: "",
    previous: "",
    pages: Math.ceil(input.results.length/limit),
    results: input.results.slice(startIndex, endIndex)
  }

  if (endIndex < input.results.length) {
    data.next = `${protocol}://${host}${baseUrl}${path}?page=${page + 1}&limit=${limit}`
  }

  if (startIndex > 0) {
    data.previous = `${protocol}://${host}${baseUrl}${path}?page=${page - 1}&limit=${limit}`
  }

  return data
}

module.exports = {
  audioList,
  recordingNumber,
  allRecordingRegions,
  recordingRegion,
  regionsForYear,
  recordingsForYear,
  callersForYear,
  readingsForYear,
  lecturesForYear,
  topCalls,
  testTemplate
}
