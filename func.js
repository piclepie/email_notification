function data_info_changes(sheetid1,sheeid2) {

  const current_data = SpreadsheetApp.openById(sheetid1).getSheetByName(sheetname).getDataRange().getValues();
  const pre_data = SpreadsheetApp.openById(sheetid2).getActiveSheet().getDataRange().getValues();
  const uniqe_id_old = pre_edata.map(r => r[0]);

  let matched_array1 = [];
  for(i in uniqe_id_old){
    current_data.filter(r => {
      if(r[0] == uniqe_id_old[i]){
        const old_epy_reocrd = pre_data.find(eid =>{ return eid[0] == uniqe_id_old[i]});
        r.map((el,index) =>{              
          if(el !== old_epy_reocrd[index]){
            matched_array1.push([r[0],r[1],r[2],r[3])
          }
        })
        return ;
      }
    })
  }

  let table_html = [];
  table_html.push('<table><tbody><thead>');
  table_html.push( matched_array1.map(r => "<tr>"+ r.map(d => "<td>" +d+"</td>" ) +"</tr>").join(''));
  table_html.push('</tbody></table>');
  table_html = table_html.toString().replace(/\,/g,'');
  const testmessagebody = HtmlService.createHtmlOutputFromFile("htmlfilename").getContent();
  let new_messagebody = testmessagebody.replace('{htmltagname}',table_html.toString())
                                       .replace('{today_date}',new Date());
  if(matched_array1.length >= 1){
    GmailApp.sendEmail(
      'reciptantemail',
      'subject',
      new_messagebody,
        {
          htmlBody: emailbody,
          name: 'name',
        });
  }


}
