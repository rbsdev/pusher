package br.com.zerohora.pusher;

import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.LinkedHashMap;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import br.com.zerohora.pusher.exception.PusherException;
import br.com.zerohora.pusher.exception.PusherException.Errors;
import br.com.zerohora.repo.ZHRepository;

/**
 * Copyright 2014 Zero Hora
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * @author isaias_alves <isaiasa@gmail.com>
 */
public class PusherList {

	protected ZHRepository repo;
	protected Integer maxSize = 100;
	protected static final SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd:HH:mm:ss");
	
	public JSONArray listNews( final String team,
							   final Integer hl, 
							   final Integer size ) throws PusherException {
		
		if (repo == null) {
			try {
				repo = new ZHRepository(ZHRepository.Teams.valueOf(team.toUpperCase()), size, hl);
			} catch (Exception e) {
				PusherException pusherRepoError = new PusherException(Errors.NEWS_REPO_ERROR);
				pusherRepoError.addSuppressed(e);
				throw pusherRepoError;
			}
		}
		
		if (size > 100) {
			throw new PusherException(Errors.NEWS_LIMIT_ERROR);
		}
		
		JSONObject matchObject = (JSONObject) repo.getMatch();
		
		if (matchObject!=null) {
			
			final Integer period = matchObject.getInt("period");
			
			if (period > 0 &&  period < 6) {
				
				final String matchURL = matchObject.getString("url");
				final String matchId =  matchObject.getString("id");
				final String message = buildMessageByMatch(matchObject, period);
			
				
				JSONObject currentMatchObject = new JSONObject();
				
				
				currentMatchObject.put("id",0);
				currentMatchObject.put("title",message);
				currentMatchObject.put("tag",message);
				currentMatchObject.put("link",matchURL);
				currentMatchObject.put("link-desktop",matchURL);
				currentMatchObject.put("link-mobile",matchURL);
				//currentMatchObject.put("date",sdf.parseObject(matchObject.getString("date")));
				
				
				//currentMatchObject.put("original-thumb",message); // TODO desenhar
				
			}
			
		}
		
		return repo.getNews();
	}
	
	/**
	 * PRE_MATCH(0, "Pré-jogo"), 
	 * FIRST_HALF(1, "Primeiro tempo"), 
	 * INTERVAL(2, "Intervalo"), 
	 * SECOUND_HALF(3, "Segundo tempo"), 
	 * PRORROGATION(4, "Prorrogação"), 
	 * PENALTY(5, "Pênalti"), 
	 * FINISHED(6, "Encerrado");
	 * 
	 *	 "Acompanhe o pré-jogo de Gremio x Flamengo"
	 *	 "Acompanhe o Primeiro tempo de Grêmio 1 x 0 Flamengo."
     *	 "Acompanhe o intervalo de Grêmio 1 x 0 Flamengo."	
	 *	 "Acompanhe o Segundo tempo de Grêmio 1 x 0 Flamengo."
	 *	 "Acompanhe a prorrogação de Grêmio 1 x 0 Flamengo."
	 *	 "Acompanhe os pênaltis de Grêmio 1(3) x 1(2) Flamengo."
     *
	 * @param matchObject
	 * @return
	 */
	private String buildMessageByMatch(JSONObject matchObject, final Integer period) {
		
		
		StringBuilder message = new StringBuilder();
		
		final JSONObject homeTeam = matchObject.getJSONObject("home");
		final Integer teamHome = homeTeam.getInt("name");
		final Integer scoreHome = homeTeam.getInt("score");
		
		final JSONObject awayTeam = matchObject.getJSONObject("home");
		final Integer teamAway = awayTeam.getInt("name");
		final Integer scoreAway = awayTeam.getInt("score");
		
		
		
		message.append("Acompanhe ");
		if (period!=4) {
			message.append("o ");
		} else {
			message.append("a ");
		}
		message.append( getPeriods().get(period) );
		message.append(" de ").append(teamHome);
		message.append(scoreHome).append(" x ").append( scoreAway );
		message.append(" ").append(teamAway).append(".");
		
		return message.toString();
	}
	
	protected final HashMap<Integer,String> getPeriods() {
		
		HashMap<Integer,String> periods = new LinkedHashMap<Integer,String>();
		
		periods.put(0, "pré-jogo");
		periods.put(1, "primeiro tempo");
		periods.put(2, "intervalo");
		periods.put(3, "segundo tempo");
		periods.put(4, "prorrogação");
		periods.put(5, "pênaltis");
		
		return periods;
	}
	
	public void setRepo(ZHRepository repo) {
		this.repo = repo;
	}

}


