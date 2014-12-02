package br.com.zerohora.pusher;

import net.sf.json.JSONArray;
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
	
	public JSONArray listNews( final String team,
							   final Integer hl, 
							   final Integer size ) throws PusherException {
		
		if (repo == null) {
			try {
				
				System.out.println("-team-> " + team.toUpperCase());
				
				System.out.println("-team-enum-->" + ZHRepository.Teams.valueOf(team.toUpperCase()));
				
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
		
		return repo.getNews();
	}
	
	public void setRepo(ZHRepository repo) {
		this.repo = repo;
	}

}


