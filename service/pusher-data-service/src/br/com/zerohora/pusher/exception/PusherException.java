package br.com.zerohora.pusher.exception;


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
public class PusherException extends Exception {

	private static final long serialVersionUID = -646455411442326587L;
	private String message;
	
	public enum Errors {
		NEWS_REPO_ERROR(1,"Invalid or not accessible repo."),
		NEWS_LIMIT_ERROR(3,"List size out of limit.");
		
		private Errors(final Integer code,final String message ) {	
			this.code = code;
			this.message = message;
		}
		
		private Integer code;
		private String message;
		
		public Integer getCode() {
			return code;
		}
		public String getMessage() {
			return message;
		}
		@Override
		public String toString() {
			return "Code:"+code+", Error:" +message;
		}
	}
	
	public PusherException( Errors customError  ) {
		super(customError.toString());
	}
	
	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

}
