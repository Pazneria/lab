"use strict";
// A bounded, offline delta over the exact October 19 publication input.
const fs=require('node:fs'), path=require('node:path'), assert=require('node:assert/strict'), crypto=require('node:crypto');
const root=path.resolve(__dirname,'..'), dir='data/benchmark-refresh-2026-10-26/';
const sourceInput=dir+'source-packet.json', manifestInput=dir+'evidence-manifest.json';
const read=p=>JSON.parse(fs.readFileSync(path.join(root,p),'utf8'));
const clone=x=>JSON.parse(JSON.stringify(x));
function build(){
  const packet=read(sourceInput), manifest=read(manifestInput), bytes=fs.readFileSync(path.join(root,sourceInput));
  assert.equal(manifest.files[0].path,'source-packet.json');
  assert.equal(bytes.length,manifest.files[0].bytes);
  assert.equal(crypto.createHash('sha256').update(bytes).digest('hex'),manifest.files[0].sha256);
  assert.equal(packet.checked_at,'2026-10-26');
  assert.equal(packet.arena_frontend.snapshot_at,'2026-10-22');
  assert.equal(packet.arena_frontend.displayed_models,151);
  assert.equal(packet.arena_frontend.displayed_total_votes,807096);
  assert.equal(packet.arena_frontend.rows.length,20);
  const prior=require('./build-gallery-refresh-2026-10-19.cjs')();
  const coverage=clone(prior.coverage), metadata=clone(prior.metadata), notes={};
  const arena=clone(prior.projection.card), id='webdev-arena-frontend-2026-10-22';
  arena.id=id; arena.name='WebDev Arena · Frontend · October 22';
  arena.question='Which generated websites did people prefer in the October 22 Frontend view?';
  arena.tests='This dated preference view selects the first 20 configurations from 151 displayed model entries. The page reports 807,096 votes; each configuration has its own vote count.';
  arena.read='Higher means a higher human preference rating in the Frontend category. Published bounds have unspecified confidence coverage. This is a selection of 20 configurations, not the full board. Keep effort, preliminary status and date separate; token list prices are not task costs. October 18 and October 8 remain separate earlier snapshots.';
  arena.source_input=sourceInput; arena.source_inputs=[sourceInput]; arena.source_packet_checked_at=packet.checked_at;
  const v=arena.variants[0];
  v.id=id; v.label='October 22 · first 20 of 151 displayed configurations';
  v.rows=packet.arena_frontend.rows.map(raw=>({...clone(raw),label:raw.model_variant,result_id:raw.source_row_key,source_url:packet.arena_frontend.source_url,raw:clone(raw)}));
  v.source_input=sourceInput; v.snapshot_at='2026-10-22'; v.checked_at=packet.checked_at;
  v.source_locator='October 22, 2026, Code Arena / WebDev / Frontend, ranks 1–20';
  v.settings={...v.settings,displayed_total_votes:807096,displayed_models:151,selection:packet.arena_frontend.selection,vote_count_basis:packet.arena_frontend.vote_count_basis};
  v.complete=false; v.coverage=packet.arena_frontend.selection;
  v.limitations[0]='Dated first-20 selection from 151 configurations; not the complete board.';
  const m=packet.medical;
  function medicalCard(id,name,description,source,sourceLocator,rawRows,metrics,settings,readText){
    const rows=rawRows.map((raw,i)=>({...clone(raw),label:raw.model_variant,result_id:id+'-row-'+i,source_url:source,raw:clone(raw)}));
    return {id,name,category:'medical',question:description,tests:description,
      matters:'Rubric scores describe responses under a benchmark protocol. They do not establish patient outcomes or safe clinical deployment.',
      read:readText,historical:false,source_input:sourceInput,source_inputs:[sourceInput],source_packet_checked_at:packet.checked_at,
      variants:[{id,label:'October release system-card table · separate deployment cohort',rows,metrics,source_url:source,source_locator:sourceLocator,settings,
        source_input:sourceInput,snapshot_at:null,publication_at:null,evaluation_date:null,checked_at:packet.checked_at,complete:true,
        coverage:'Complete reported model columns for this selected table outcome; other outcomes not ingested.',
        limitations:['October ChatGPT models differ from September Codex/Work releases.','Previously launched comparison values may reflect later versions than at launch.','Run dates, measured cost/time and exact model snapshots remain unavailable.','These are developer-reported evaluations, not a controlled comparison against other cards.']}]};
  }
  const health=medicalCard('healthbench-professional-october-deployment','HealthBench Professional · October deployment',
    'How do the October ChatGPT deployments score on professional medical conversations?',m.source_url,m.healthbench_professional.source_locator,m.healthbench_professional.rows,
    [{id:'adjusted',label:'Length-adjusted rubric score',field:'value',unit:'percent',domain:[0,100],direction:'higher_is_better'},
     {id:'raw',label:'Unadjusted rubric score',field:'unadjusted_value',unit:'percent',domain:[0,100],direction:'higher_is_better'}],
    {reasoning_effort:null,effort_policy:m.effort_policy,sample_size:null,tools:null,harness:'OpenAI October release system-card evaluation; exact table-level settings unavailable',adjustment:m.healthbench_professional.adjustment},
    'The default graph uses length-adjusted scores; the unadjusted metric is a separate choice. October releases and revised comparison models must not be merged with the September table. Exact effort and run dates are unknown. These scores do not measure clinical efficacy.');
  const mental=medicalCard('mentalhealthbench-october-deployment','MentalHealthBench · October deployment',
    'How do the October deployments respond to synthetic mental-health conversations?',m.mental_source_url,m.mentalhealthbench.source_locator,m.mentalhealthbench.rows,
    [{id:'score',label:'Task-clipped rubric score',field:'value',unit:'percent',domain:[0,100],direction:'higher_is_better',stderr_field:'stderr_pp'}],
    {reasoning_effort:'lowest reasoning deployment settings; exact effort identifiers unavailable',tasks:1215,samples_per_task:4,acuity_tasks:{non_acute:650,high_acuity:221,emergent:344},uncertainty:m.mentalhealthbench.uncertainty,tools:null,harness:'OpenAI October release task-clipped rubric evaluation'},
    'Scores average four responses per task, then 1,215 task means. Bars show one standard error across task means, not a confidence interval. This lowest-deployment-effort cohort stays separate from the September maximum-effort and author-paper default-effort cohorts. Synthetic rubric performance does not establish clinical safety.');
  const added=[arena,health,mental]; coverage.cards.push(...added);
  coverage.familyGroups['webdev-arena-frontend'].unshift(id);
  coverage.familyGroups['healthbench-professional'].unshift(health.id);
  coverage.familyGroups.mentalhealthbench=[mental.id,'mentalhealthbench'];
  coverage.weekly_refresh={schema_version:1,checked_at:packet.checked_at,source_snapshot_at:'2026-10-22',source_input:sourceInput,card_ids:added.map(c=>c.id)};
  const oldIds=['webdev-arena-frontend-2026-10-18','healthbench-professional-openai-20260929','mentalhealthbench'];
  for(const oldId of oldIds){
    metadata.cards[oldId].cohort='historical';
    metadata.cards[oldId].cohort_basis='Earlier source snapshot retained as a separate version/configuration; October deployment/Frontend evidence is separately selectable. Different effort and releases prevent a before/after capability claim.';
  }
  for(const c of added){
    metadata.cards[c.id]={evidence:'plotted',cohort:'latest_collected',cohort_basis:c.id===id?'Selected October 22 preference snapshot, first 20 of 151; not a complete board.':'Separate October ChatGPT deployment report; not the September Codex/Work model or maximum-effort cohort.',discovery_lifecycle:null,
      source_review:{date:packet.checked_at,mode:'primary_source_review',scope:'Direct primary table review; no independent evaluation executed.'},result_packet_checked_at:packet.checked_at,snapshot_at:c.id===id?'2026-10-22':null,publication_at:null,publication_label:null,
      evaluations:[{slice:c.variants[0].label,earliest:null,latest:null,known:0,unknown:c.variants[0].rows.length}],model_releases:{earliest:null,latest:null,known:0,unknown:c.variants[0].rows.length}};
    notes[c.id]={question:c.question,tests:c.tests,matters:c.matters,read:c.read,date:c.id===id?'Arena table dated October 22; reviewed October 26, 2026':'October release report reviewed October 26, 2026; precise publication and evaluation dates unavailable'};
  }
  for(const review of packet.source_reviews)for(const reviewedId of review.ids){
    if(!metadata.cards[reviewedId])continue;
    metadata.cards[reviewedId].source_review={date:packet.checked_at,mode:'primary_source_recheck',scope:review.finding,audit_status:review.decision};
    metadata.cards[reviewedId].review_source_input=sourceInput;
  }
  notes['design-arena-frontend']={read:'DesignArena measures human preference with Bradley–Terry ratings. Website/frontend, HTML, agentic and builder setups remain separate. The reviewed category page provided no extractable synchronized score rows; unavailable is not zero. Output limits and settings are not standardized.'};
  notes['webrise-v1-text']={read:'Transition validity, requirement coverage and auxiliary visual quality answer separate questions. The source contains 442 tasks, 5,495 transitions and 5,271 checks. Existing Text results remain; exact snapshots, effort and run dates are unavailable, so this is not a newly measured frontier ranking.'};
  metadata.prepared_at=packet.checked_at;
  metadata.basis='Earlier source evidence preserved; October 22 selected Frontend table and separate October medical deployment tables added after October 26 review.';
  const values=Object.values(metadata.cards);
  metadata.counts={all:values.length,plotted:values.filter(m=>m.evidence==='plotted').length,current:values.filter(m=>m.evidence==='plotted'&&m.cohort==='latest_collected').length,historical:values.filter(m=>m.cohort==='historical').length,source_only:values.filter(m=>m.evidence==='source_only').length,unavailable:values.filter(m=>m.evidence==='unresolved').length};
  const families=new Map(Object.entries(coverage.familyGroups).flatMap(([key,ids])=>ids.map(item=>[item,key])));
  metadata.counts.default_families=new Set(Object.entries(metadata.cards).filter(([,m])=>m.evidence==='plotted').map(([key])=>families.get(key)||key)).size;
  assert.equal(metadata.counts.all,92);assert.equal(metadata.counts.plotted,83);assert.equal(metadata.counts.default_families,60);
  assert.deepEqual(coverage.cards.slice(0,prior.coverage.cards.length),prior.coverage.cards);
  return {coverage,metadata,notes,projection:{schema_version:1,checked_at:packet.checked_at,cards:added,source_reviews:packet.source_reviews,source_files:[sourceInput,manifestInput],source_integrities:manifest.files}};
}
module.exports=build;
if(require.main===module){const out=build();for(const [file,value]of[['data/gallery-refresh-projection-2026-10-26.json',out.projection],['data/gallery-metadata-2026-10-26.json',out.metadata]]){
  if(process.argv.includes('--check'))assert.deepEqual(read(file),value,file);else fs.writeFileSync(path.join(root,file),JSON.stringify(value,null,2)+'\n');
}console.log(JSON.stringify({addedRows:31,counts:out.metadata.counts}));}
