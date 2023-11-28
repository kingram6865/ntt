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

const audioList = async (req, res) => {
  let rows, results
  let pagingData = setPagingData(req)
  console.log(pagingData)

  // let inputPages = req.query.page
  // let inputlimit = req.query.limit
  // let protocol = req.protocol
  // let host = req.get('Host')
  // let baseUrl = req.baseUrl
  // let path = req.path
  let inputPages = pagingData.totalPages
  let inputlimit = pagingData.recordlimit
  let protocol = pagingData.protocol
  let host = pagingData.host
  let baseUrl = pagingData.baseUrl
  let path = pagingData.path


  const pageMax = 50
  const page = (inputPages) ? parseInt(inputPages) : 1
  const limit = (inputlimit > pageMax) ? parseInt(inputlimit) : pageMax
  const startIndex = (page - 1) * limit
  const endIndex = page * limit

  try {
    SQL=`SELECT * FROM ntt_recordings`
    rows = await executeSql(SQL)
    results = rows[0]

    let data = {
      "Total Results": results.length,
      "Results per page": `${limit} - Max ${pageMax} results per page`,
      next: "",
      previous: "",
      pages: Math.ceil(results.length/limit),
      results: results.slice(startIndex, endIndex)
    }

    if (endIndex < results.length) {
      // data.next = `${req.protocol}://${req.get('Host')}${req.baseUrl}${req.path}?page=${page + 1}&limit=${limit}`
      data.next = `${protocol}://${host}${baseUrl}${path}?page=${page + 1}&limit=${limit}`
    }

    if (startIndex > 0) {
      // data.previous = `${req.protocol}://${req.get('Host')}${req.baseUrl}${req.path}?page=${page - 1}&limit=${limit}`
      data.previous = `${protocol}://${host}${baseUrl}${path}?page=${page - 1}&limit=${limit}`
    }

    res.json(data)
  } catch (error) {
    res.status(500).json({ error: error.message })
    console.log(error)
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
  let SQL, results
  let inputPages = req.query.page
  let inputlimit = req.query.limit
  let protocol = req.protocol
  let host = req.get('Host')
  let baseUrl = req.baseUrl
  let path = req.path  



  SQL = `SELECT * FROM ntt_recording_regions WHERE recording_id = ? ORDER BY recording_id`
  SQL = formatSQL(SQL, [req.params.id])

  try {
    results = await executeSql(SQL)
    res.json(results[0])
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
  let SQL, results
  let inputPages = req.query.page
  let inputlimit = req.query.limit
  let protocol = req.protocol
  let host = req.get('Host')
  let baseUrl = req.baseUrl
  let path = req.path

  SQL = 'SELECT * FROM ntt_recordings WHERE recording_date like ?'
  SQL = formatSQL(SQL, [`%${req.params.year}%`])
  console.log(SQL)

  try {
    results = await executeSql(SQL)
    res.status(200).json(results[0])    
  } catch(error) {
    res.status(500).json({error: error.message})
    console.log(error)
  }
}

async function regionsForYear(req, res) {
  let SQL, results
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
  console.log(SQL)

  try {
    results = await executeSql(SQL)
    res.status(200).json(results[0])
  } catch(error) {
    res.status(500).json({ error: error.message})
    console.log(error)
  }
}

async function callersForYear(req, res) {
  let SQL, results
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
    res.status(200).json(results[0])
  } catch(error) {
    res.status(500).json({error: error.message})
  }
}

async function readingsForYear(req, res) {
  let SQL, results
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
    res.status(200).json(results[0])
  } catch(error) {
    res.status(500).json({error: error.message})
  }
}

async function lecturesForYear(req, res) {
  let SQL, results
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
  console.log(SQL)
  try {
    results = await executeSql(SQL)
    res.json(results[0])
  } catch(error) {
    res.status(500).json({error: error.message})
  }
}

async function topCalls(req, res) {
  let SQL, results, data
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
    res.json(results[0])
  } catch(error) {
    res.status(500).json({error: error.message})
    console.log(error)
  }
}

function setPagingData(input) {
  return {
    totalPages: input.query.page,
    recordlimit: input.query.limit,
    protocol: input.protocol,
    host: input.get('Host'),
    baseUrl: input.baseUrl,
    path: input.path
  }
}

function formatOutput(input) {
  let output, rows, results, inputPages, inputlimit

  const pageMax = 50
  const page = (req.query.page) ? parseInt(req.query.page) : 1
  const limit = (req.query.limit > pageMax) ? parseInt(req.query.limit) : pageMax
  const startIndex = (page - 1) * limit
  const endIndex = page * limit
  
  let data = {
    "Total Results": results.length,
    "Results per page": `${limit} - Max ${pageMax} results per page`,
    next: "",
    previous: "",
    pages: Math.ceil(results.length/limit),
    results: results.slice(startIndex, endIndex)
  }

  if (endIndex < results.length) {
    data.next = `${req.protocol}://${req.get('Host')}${req.baseUrl}${req.path}?page=${page + 1}&limit=${limit}`
  }

  if (startIndex > 0) {
    data.previous = `${req.protocol}://${req.get('Host')}${req.baseUrl}${req.path}?page=${page - 1}&limit=${limit}`
  }

  return output
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
  topCalls
}

// async function execute() {
//   let result = topCalls('a', 'data')
// }

// execute()