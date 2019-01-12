import React, { Component, createElement, cloneElement } from 'react'
import styled, { ThemeProvider } from 'styled-components'

import { MidiAccessWithSettings, withKeyboardContext } from '../contexts'
import { UIItem, SourceLED, StoredPatchName } from './containers'
import { Button, Knob, List, Grid, Row, Col, ListBox, SourceBlock, Group, Toggler, LED, TabContainer } from './commons'
import { PatchName, FreqKnob, Settings } from './blocks'
import { params as paramsdata, ASCIIChars } from '../data/'

const Wrapper = styled.div`
  position: relative;
  overflow: hidden;
  width: 1200px;
  height: 100%;
  overflow: hidden;
`

const MainGrid = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-areas:
    'COMMON COMMON COMMON S1 S1 S1 S1 S1 S1 S1 S1 S1'
    'COMMON COMMON COMMON S1 S1 S1 S1 S1 S1 S1 S1 S1'
    'COMMON COMMON COMMON S2 S2 S2 S2 S2 S2 S2 S2 S2'
    'COMMON COMMON COMMON S2 S2 S2 S2 S2 S2 S2 S2 S2'
    'COMMON COMMON COMMON S3 S3 S3 S3 S3 S3 S3 S3 S3'
    'COMMON COMMON COMMON S3 S3 S3 S3 S3 S3 S3 S3 S3'
    'COMMON COMMON COMMON S4 S4 S4 S4 S4 S4 S4 S4 S4'
    'COMMON COMMON COMMON S4 S4 S4 S4 S4 S4 S4 S4 S4';
`

const COMMON = styled.div`
  grid-area: COMMON;
  overflow: hidden;
`
const S1 = styled.div`
  grid-area: S1;
  overflow: hidden;
`
const S2 = styled.div`
  grid-area: S2;
  overflow: hidden;
`
const S3 = styled.div`
  grid-area: S3;
  overflow: hidden;
`
const S4 = styled.div`
  grid-area: S4;
  overflow: hidden;
`
const makeSourceGUI = n => ({
  legend: `Source ${n}`,
  items: [
    {
      TabContainer: [
        {
          header: 'FREQ',
          items: Object.keys(paramsdata.allFreqs)
            .filter(key => !!~key.indexOf(`_${n}`))
            .map(id => ({
              item: id
            }))
        },
        {
          header: 'ENV',
          items: Object.keys(paramsdata.allEnvs)
            .filter(key => !!~key.indexOf(`_${n}`))
            .map(id => ({
              item: id
            }))
        }
      ]
    }
  ]
})

const StyledSourcesWrapper = styled.section`
  display: flex;
  flex-wrap: wrap;
`

const StyledSourcesList = styled.section`
  display: flex;
  ul {
    display: flex;
    margin: 0;
    padding: 0;
    flex-wrap: wrap;
    list-style: none;
    justify-content: space-around;
  }
`

const StyledVoiceBlock = styled.section`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;

  ${Group.StyledGroup} {
    box-sizing: border-box;
  }
`

const StyledCommonBlock = styled.section`
  display: flex;
  flex-wrap: wrap;
`

class GUI extends Component {
  makeFreqTab = n => () => (
    <>
      <Group legend="Tuning">
        <UIItem id={`freq_key_track_${n}`} />
        <FreqKnob index={n} />
        <UIItem id={`freq_fine_${n}`} />
      </Group>
      <Group legend="Mod">
        <UIItem id={`freq_vibrato_autobend_${n}`} />
        <UIItem id={`freq_prs_freq_${n}`} />
        <UIItem id={`freq_ks_freq_${n}`} />
      </Group>
    </>
  )

  makeEnvTab = n => () => (
    <>
      <Group legend="Amp">
        <UIItem id={`env_level_${n}`} />
        <UIItem id={`env_delay_${n}`} />
        <UIItem id={`env_vel_curve_${n}`} />
      </Group>
      <Group legend="ADSR">
        <UIItem id={`env_attack_${n}`} />
        <UIItem id={`env_decay_${n}`} />
        <UIItem id={`env_sustain_${n}`} />
        <UIItem id={`env_release_${n}`} />
      </Group>
      <Group legend="Level Mod">
        <UIItem id={`env_level_mod_vel_env_${n}`} />
        <UIItem id={`env_level_mod_prs_env_${n}`} />
        <UIItem id={`env_level_mod_ks_env_${n}`} />
      </Group>
      <Group legend="Time Mod">
        <UIItem id={`env_time_mod_vel_env_${n}`} />
        <UIItem id={`env_time_mod_ks_env_${n}`} />
      </Group>
    </>
  )

  render() {
    return (
      <Wrapper>
        <MainGrid>
          <COMMON>
            <StoredPatchName />
            <StyledSourcesList>
              <ul>
                {new Array(4).fill(0).map((_, i) => (
                  <li key={i}>
                    <SourceLED id={`s${i + 1}_mute`}>s{i + 1}</SourceLED>
                  </li>
                ))}
              </ul>
            </StyledSourcesList>

            <StyledVoiceBlock>
              <Group legend="Common">
                <Grid>
                  <Col>
                    <Row>
                      <UIItem id={'common_volume'} />
                    </Row>
                    <Row>
                      <UIItem id={'common_pitch_bend'} />
                    </Row>
                    <Row>
                      <UIItem id={'common_prs_freq'} />
                    </Row>
                  </Col>
                  <Col>
                    <Row>
                      <UIItem id={'common_ks_curve'} />
                    </Row>
                    <Row>
                      <UIItem id={'common_poly_mode'} />
                    </Row>
                  </Col>
                </Grid>
              </Group>
              <Group legend="Vibrato">
                <Grid>
                  <Col>
                    <Row>
                      <UIItem id={'common_vibrato_depth'} />
                    </Row>
                    <Row>
                      <UIItem id={'common_vibrato_speed'} />
                    </Row>
                    <Row>
                      <UIItem id={'common_vibrato_shape'} />
                    </Row>
                  </Col>
                  <Col>
                    <Row>
                      <UIItem id={'common_vibrato_prs_depth'} />
                    </Row>
                    <Row>
                      <UIItem id={'common_vibrato_wheel'} />
                    </Row>
                  </Col>
                </Grid>
              </Group>
              <Group legend="Auto Bend">
                <Grid>
                  <Col>
                    <Row>
                      <UIItem id={'common_auto_bend_depth'} />
                    </Row>
                    <Row>
                      <UIItem id={'common_auto_bend_time'} />
                    </Row>
                  </Col>
                  <Col>
                    <Row>
                      <UIItem id={'common_auto_vel_dep'} />
                    </Row>
                    <Row>
                      <UIItem id={'common_auto_ks_time'} />
                    </Row>
                  </Col>
                </Grid>
              </Group>
              <Group legend="Sources">
                <Grid>
                  <Col>
                    <Row>
                      <UIItem id={'common_sources'} />
                    </Row>
                    <Row>
                      <UIItem id={'common_am_1'} />
                    </Row>
                    <Row>
                      <UIItem id={'common_am_2'} />
                    </Row>
                  </Col>
                </Grid>
              </Group>
            </StyledVoiceBlock>
            <StyledVoiceBlock>
              {new Array(4).fill(0).map((_, i) => (
                <UIItem key={`wave_select_${i}`} id={`wave_select_${i}`} />
              ))}
            </StyledVoiceBlock>
          </COMMON>
          {[S1, S2, S3, S4].map((Block, i) => (
            <Block key={i}>
              <TabContainer
                items={[
                  {
                    header: 'Freq',
                    Component: this.makeFreqTab(i)
                  },
                  {
                    header: 'Env',
                    Component: this.makeEnvTab(i)
                  }
                ]}
              />
            </Block>
          ))}
        </MainGrid>
        <Settings />
      </Wrapper>
    )
  }
}

export default GUI
